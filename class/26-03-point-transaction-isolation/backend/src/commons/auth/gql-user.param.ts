import { GqlExecutionContext } from '@nestjs/graphql';
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface ICurrentUser {
    id?: string,
    email: string,
    password?: string,
    name?: string,
    age?: number
}
export const CurrentUser = createParamDecorator(
    (data, context: ExecutionContext): ICurrentUser => {
        const ctx = GqlExecutionContext.create(context)
        return ctx.getContext().req.user
    }
)

