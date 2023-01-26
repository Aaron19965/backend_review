import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { Product } from "./product.entity";
import { BigQuery } from '@google-cloud/bigquery'

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface<Product> {
    constructor(connection: Connection){
        connection.subscribers.push(this)
    }

    listenTo() {
        return Product
    }

    afterInsert(event: InsertEvent<Product>): void | Promise<any> {
        console.log(event)

        const bigQuery = new BigQuery({
            keyFilename: process.env.GCP_BIGQUERY_KEY_FILE_NAME,
            projectId: process.env.GCP_BIGQUERY_PROJECT_ID
        })

        bigQuery
            .dataset(process.env.GCP_BIGQUERY_DATASET)
            .table(process.env.GCP_BIGQUERY_TABLE)
            .insert([
                {
                    id: event.entity.id,
                    name: event.entity.name,
                    description: event.entity.description,
                    price: event.entity.price,
                    isSoldout: event.entity.isSoldout
                }
            ])
    }
}
