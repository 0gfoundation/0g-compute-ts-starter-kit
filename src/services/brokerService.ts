import { ethers } from "ethers";
import { createZGComputeNetworkBroker, ZGComputeNetworkBroker } from "@0glabs/0g-serving-broker";
import OpenAI from "openai";
import dotenv from "dotenv";

// Official 0G providers
export const OFFICIAL_PROVIDERS = {
  "llama-3.3-70b-instruct": "0xf07240Efa67755B5311bc75784a061eDB47165Dd",
  "deepseek-r1-70b": "0x3feE5a4dd5FDb8a32dDA97Bed899830605dBD9D3",
  "qwen2.5-vl-72b-instruct": "0x6D233D2610c32f630ED53E8a7Cbf759568041f8f"
};

dotenv.config();

class BrokerService {
  private wallet: ethers.Wallet | null = null;
  private broker: ZGComputeNetworkBroker | null = null;
  private initialized = false;
  private initPromise: Promise<void> | null = null;

  constructor() {
    // Initialize immediately
    this.initPromise = this.initialize();
  }

  private async initialize(): Promise<void> {
    try {
      const privateKey = process.env.PRIVATE_KEY;
      if (!privateKey) {
        throw new Error('PRIVATE_KEY is required in .env file');
      }
      
      const provider = new ethers.JsonRpcProvider("https://evmrpc-testnet.0g.ai");
      this.wallet = new ethers.Wallet(privateKey, provider);
      this.broker = await createZGComputeNetworkBroker(this.wallet);
      this.initialized = true;
      console.log("Broker service initialized successfully with wallet:", this.wallet.address);
    } catch (error: any) {
      console.error("Failed to initialize broker service:", error.message);
      throw error;
    }
  }

  /**
   * Ensures broker is initialized before any operation
   */
  private async ensureInitialized(): Promise<void> {
    if (!this.initialized && this.initPromise) {
      await this.initPromise;
    }
    
    if (!this.broker || !this.wallet) {
      throw new Error("Broker service not properly initialized");
    }
  }

  /**
   * Deposit funds to account
   * @param amount Amount to deposit in ETH
   */
  async depositFunds(amount: number): Promise<string> {
    await this.ensureInitialized();
    
    try {
      await this.broker!.ledger.depositFund(amount);
      return "Deposit successful";
    } catch (error: any) {
      throw new Error(`Failed to deposit funds: ${error.message}`);
    }
  }

  /**
   * Add funds to ledger
   * @param amount Amount to add
   */
  async addFundsToLedger(amount: number): Promise<string> {
    await this.ensureInitialized();
    
    try {
      await this.broker!.ledger.addLedger(amount);
      return "Funds added to ledger successfully";
    } catch (error: any) {
      throw new Error(`Failed to add funds to ledger: ${error.message}`);
    }
  }

  /**
   * Get current balance
   */
  async getBalance(): Promise<any> {
    await this.ensureInitialized();
    
    try {
      const balanceInfo = await this.broker!.ledger.getLedger();
      return balanceInfo;
    } catch (error: any) {
      throw new Error(`Failed to get balance: ${error.message}`);
    }
  }


  /**
   * Acknowledge a provider before using their services
   * @param providerAddress Provider address to acknowledge
   */
  async acknowledgeProvider(providerAddress: string): Promise<string> {
    await this.ensureInitialized();

    try {
      await this.broker!.inference.acknowledgeProviderSigner(providerAddress);
      return `Provider ${providerAddress} acknowledged successfully`;
    } catch (error: any) {
      throw new Error(`Failed to acknowledge provider: ${error.message}`);
    }
  }

  /**
   * Transfer funds to a specific provider
   * Required before using a provider's services (minimum 1 OG per provider)
   * @param providerAddress Provider address to transfer funds to
   * @param amount Amount in OG tokens (minimum 1.0 recommended)
   */
  async transferFundsToProvider(providerAddress: string, amount: number): Promise<string> {
    await this.ensureInitialized();

    try {
      const transferAmount = ethers.parseEther(amount.toString());
      await this.broker!.ledger.transferFund(providerAddress, "inference", transferAmount);
      return `Successfully transferred ${amount} OG to provider ${providerAddress}`;
    } catch (error: any) {
      throw new Error(`Failed to transfer funds to provider: ${error.message}`);
    }
  }

  /**
   * List available services with enhanced information
   */
  async listServices(): Promise<any[]> {
    await this.ensureInitialized();
    
    try {
      const services = await this.broker!.inference.listService();
      
      // Enhance services with additional metadata
      return services.map((service: any) => ({
        ...service,
        inputPriceFormatted: ethers.formatEther(service.inputPrice || 0),
        outputPriceFormatted: ethers.formatEther(service.outputPrice || 0),
        isOfficial: Object.values(OFFICIAL_PROVIDERS).includes(service.provider),
        isVerifiable: service.verifiability === 'TeeML',
        modelName: Object.entries(OFFICIAL_PROVIDERS).find(([_, addr]) => addr === service.provider)?.[0] || 'Unknown'
      }));
    } catch (error: any) {
      throw new Error(`Failed to list services: ${error.message}`);
    }
  }

  /**
   * Manually settle a fee
   * @param providerAddress Provider address
   * @param fee Fee amount
   */
  async settleFee(providerAddress: string, fee: number): Promise<string> {
    await this.ensureInitialized();
    
    try {
      // Note: settleFee API might have changed in current SDK version
      // Using the broker's ledger to settle fee instead
      throw new Error("settleFee method may not be available in current SDK version. Please check the latest SDK documentation.");
    } catch (error: any) {
      throw new Error(`Failed to settle fee: ${error.message}`);
    }
  }

  /**
   * Request refund for unused funds
   * @param amount Amount to refund in OG
   */
  async requestRefund(amount: number): Promise<string> {
    await this.ensureInitialized();

    try {
      // In 0.6.x, use refund() method which takes amount in OG
      await this.broker!.ledger.refund(amount);
      return `Refund of ${amount} OG requested successfully`;
    } catch (error: any) {
      throw new Error(`Failed to request refund: ${error.message}`);
    }
  }

  /**
   * Retrieve funds from sub-accounts (inference or fine-tuning)
   * @param serviceType Service type: "inference" or "fine-tuning"
   */
  async retrieveFunds(serviceType: "inference" | "fine-tuning"): Promise<string> {
    await this.ensureInitialized();

    try {
      await this.broker!.ledger.retrieveFund(serviceType);
      return `Funds retrieved from ${serviceType} sub-accounts successfully`;
    } catch (error: any) {
      throw new Error(`Failed to retrieve funds: ${error.message}`);
    }
  }

  /**
   * Delete ledger account
   */
  async deleteLedger(): Promise<string> {
    await this.ensureInitialized();

    try {
      await this.broker!.ledger.deleteLedger();
      return `Ledger deleted successfully`;
    } catch (error: any) {
      throw new Error(`Failed to delete ledger: ${error.message}`);
    }
  }

  /**
   * Send a query to an AI service
   * @param providerAddress Provider address
   * @param query Query text
   * @param fallbackFee Optional fallback fee
   */
  async sendQuery(providerAddress: string, query: string, fallbackFee?: number): Promise<any> {
    await this.ensureInitialized();
    
    try {
      // Get the service metadata
      const { endpoint, model } = await this.broker!.inference.getServiceMetadata(providerAddress);
      
      // Get headers for authentication (single use - generate fresh for each request)
      const headers = await this.broker!.inference.getRequestHeaders(providerAddress, query);
      
      // Create OpenAI client with the service URL
      const openai = new OpenAI({
        baseURL: endpoint,
        apiKey: "", // Empty string as per docs
      });
      
      // Prepare headers in the format OpenAI client expects
      const requestHeaders: Record<string, string> = {};
      Object.entries(headers).forEach(([key, value]) => {
        if (typeof value === 'string') {
          requestHeaders[key] = value;
        }
      });
      
      // Make the API request
      const completion = await openai.chat.completions.create(
        {
          messages: [{ role: "user", content: query }],
          model, // Use the model from metadata
        },
        {
          headers: requestHeaders,
        }
      );
      
      // Process response
      const content = completion.choices[0].message.content;
      const chatId = completion.id;
      
      // Process payment - chatId is optional for verifiable services
      // Note: In 0.6.x, argument order is (providerAddress, chatId, content)
      try {
        const isValid = await this.broker!.inference.processResponse(
          providerAddress,
          chatId,
          content || ""
        );
        
        return {
          content,
          metadata: {
            model,
            isValid,
            provider: providerAddress,
            chatId,
          }
        };
      } catch (error: any) {
        // Use fallback fee if provided
        if (fallbackFee && fallbackFee > 0) {
          await this.settleFee(providerAddress, fallbackFee);
          
          return {
            content,
            metadata: {
              model,
              usedFallbackFee: true,
              fallbackFeeAmount: fallbackFee,
              provider: providerAddress,
            }
          };
        } else {
          // Enhanced error message for common issues
          if (error.message.includes('Headers already used')) {
            throw new Error('Request headers are single-use. This error indicates a system issue - please try again.');
          }
          throw new Error(`Payment processing failed: ${error.message}`);
        }
      }
    } catch (error: any) {
      // Enhanced error handling with specific guidance
      if (error.message.includes('Provider not responding')) {
        throw new Error(`Provider ${providerAddress} is not responding. Try using another provider from the service list.`);
      }
      if (error.message.includes('Insufficient balance')) {
        throw new Error('Insufficient balance. Please add funds to your account before making requests.');
      }
      throw new Error(`Query failed: ${error.message}`);
    }
  }

}

// Singleton instance
export const brokerService = new BrokerService(); 