/**
 * @swagger
 * /boards:
 *          get:
 *             summary: 게시글 가져오기
 *             tags: [Board]
 *             parameters:
 *              - in: query
 *                name: number
 *                type: int
 *             responses:
 *              200:
 *                Description: 성공
 *                content:
 *                  application/json:
 *                    schema:
 *                      type: array
 *                      items:
 *                         properties:
 *                            number:
 *                              type: int
 *                              example: 1
 *                            writer:
 *                              type: string
 *                              example: 철수
 *                            title:
 *                              type: string
 *                              example: 좋은 아침 입니다~
 *                            contents:
 *                              type: string
 *                              example: 오늘 하루도 파이팅 하세요!
 */

/**
 * @swagger
 * /boards:
 *      post:
 *          summary: 게시글 등록하기
 *          tags: [Board]
 *          parameters:
 *              - in: query
 *                name: writer
 *                type: string
 *              - in: query
 *                name: password
 *                type: string
 *              - in: query
 *                name: title
 *                type: string
 *              - in: query
 *                name: contents
 *                type: string
 *          responses:
 *              200:
 *                  Description: 성공
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  properties:
 *                                      message:
 *                                          type: string
 *                                          example: 게시글이 정상적으로 등록되었습니다.
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
