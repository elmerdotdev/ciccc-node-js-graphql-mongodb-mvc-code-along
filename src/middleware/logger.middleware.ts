import { Request, Response, NextFunction } from 'express'

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("Logging new visitor...")
  next()
}