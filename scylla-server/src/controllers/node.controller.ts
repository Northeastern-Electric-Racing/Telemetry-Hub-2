import { Request, Response } from 'express';
import NodeService from '../odyssey-base/src/services/nodes.services';

/**
 * Controller to manage Node requests and responses
 */
export default class NodeController {
  static async getAllNodes(req: Request, res: Response) {
    try {
      const allNodes = await NodeService.getAllNodes();
      res.status(200).json(allNodes);
    } catch (error: any) {
      res.status(error.status).send(error.message);
    }
  }
}
