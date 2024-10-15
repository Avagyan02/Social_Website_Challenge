import { HttpStatus } from "@nestjs/common"

export interface ResInterface {
    message: string
    data: any
    status?: HttpStatus
}