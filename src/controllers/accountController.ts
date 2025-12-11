import { Request, Response } from 'express';
import { brokerService } from '../services/brokerService';

/**
 * @swagger
 * /account/deposit:
 *   post:
 *     summary: Deposit funds to account
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount to deposit in ETH
 *     responses:
 *       200:
 *         description: Deposit successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
export const deposit = async (req: Request, res: Response) => {
  try {
    
    const { amount } = req.body;
    
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Valid amount required'
      });
    }
    
    const result = await brokerService.depositFunds(Number(amount));
    
    return res.status(200).json({
      success: true,
      message: result
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Helper function to convert BigInt values to strings in an object
 */
const convertBigIntToString = (data: any): any => {
  if (data === null || data === undefined) {
    return data;
  }
  
  if (typeof data === 'bigint') {
    return data.toString();
  }
  
  if (Array.isArray(data)) {
    return data.map(item => convertBigIntToString(item));
  }
  
  if (typeof data === 'object') {
    const result: any = {};
    for (const key in data) {
      result[key] = convertBigIntToString(data[key]);
    }
    return result;
  }
  
  return data;
};

/**
 * @swagger
 * /account/info:
 *   get:
 *     summary: Get account information
 *     tags: [Account]
 *     description: Retrieve account information including ledger, infers, and fines
 *     responses:
 *       200:
 *         description: Account information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 accountInfo:
 *                   type: object
 *                   description: Account information details
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
export const getAccountInfo = async (req: Request, res: Response) => {
  try {
    
    const balanceInfo = await brokerService.getBalance();
    console.log(balanceInfo);
    
    // Convert BigInt values to strings
    const serializedBalanceInfo = convertBigIntToString(balanceInfo);
    
    return res.status(200).json({
      success: true,
      accountInfo: serializedBalanceInfo
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};


/**
 * @swagger
 * /account/refund:
 *   post:
 *     summary: Request refund for unused funds
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Amount to refund in ETH
 *     responses:
 *       200:
 *         description: Refund requested successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
export const requestRefund = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Valid amount required'
      });
    }

    const result = await brokerService.requestRefund(Number(amount));

    return res.status(200).json({
      success: true,
      message: result
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @swagger
 * /account/add-ledger:
 *   post:
 *     summary: Create a new ledger account with initial balance
 *     tags: [Account]
 *     description: Creates a new ledger account. Minimum 3 OG required (contract requirement in v0.6.x)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 minimum: 3
 *                 description: Initial balance in OG tokens (minimum 3 OG required)
 *     responses:
 *       200:
 *         description: Ledger created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request (amount less than 3 OG)
 *       500:
 *         description: Server error
 */
export const addLedger = async (req: Request, res: Response) => {
  try {
    const { amount } = req.body;

    if (!amount || isNaN(amount) || amount < 3) {
      return res.status(400).json({
        success: false,
        error: 'Minimum 3 OG required to create ledger (contract requirement)'
      });
    }

    const result = await brokerService.addFundsToLedger(Number(amount));

    return res.status(200).json({
      success: true,
      message: result
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @swagger
 * /account/retrieve-funds:
 *   post:
 *     summary: Retrieve funds from sub-accounts
 *     tags: [Account]
 *     description: Retrieves funds from all sub-accounts (inference or fine-tuning) back to main ledger
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serviceType
 *             properties:
 *               serviceType:
 *                 type: string
 *                 enum: [inference, fine-tuning]
 *                 description: Service type to retrieve funds from
 *     responses:
 *       200:
 *         description: Funds retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Server error
 */
export const retrieveFunds = async (req: Request, res: Response) => {
  try {
    const { serviceType } = req.body;

    if (!serviceType || !['inference', 'fine-tuning'].includes(serviceType)) {
      return res.status(400).json({
        success: false,
        error: 'Valid serviceType required (inference or fine-tuning)'
      });
    }

    const result = await brokerService.retrieveFunds(serviceType);

    return res.status(200).json({
      success: true,
      message: result
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * @swagger
 * /account/delete-ledger:
 *   delete:
 *     summary: Delete ledger account
 *     tags: [Account]
 *     description: Deletes the ledger account. Make sure to retrieve all funds first.
 *     responses:
 *       200:
 *         description: Ledger deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */
export const deleteLedger = async (req: Request, res: Response) => {
  try {
    const result = await brokerService.deleteLedger();

    return res.status(200).json({
      success: true,
      message: result
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}; 