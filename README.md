# 0G Compute TypeScript SDK Starter Kit

A comprehensive REST API implementation for interacting with the 0G Compute Network using TypeScript. This starter kit demonstrates how to integrate decentralized AI services with automatic payment processing, TEE verification, and seamless wallet management.

## 🌟 Features

- **REST API Server** with Express.js and TypeScript
- **Swagger Documentation** at `/docs` for interactive API testing
- **Official 0G AI Services** with verified provider addresses
- **Automatic Ledger Management** with startup initialization
- **TEE Verification** for enhanced trust and security
- **Single-use Authentication** headers for secure requests
- **Comprehensive Test Script** for learning and debugging
- **BigInt Serialization** for blockchain data compatibility
- **Enhanced Error Handling** with troubleshooting guidance

## 🤖 Available AI Services

### Testnet Services (evmrpc-testnet.0g.ai)

| # | Model | Type | Provider | Input Price | Output Price |
|---|-------|------|----------|-------------|--------------|
| 1 | `qwen/qwen-2.5-7b-instruct` | Chatbot | `0xa48f01287233509FD694a22Bf840225062E67836` | 0.00000005 OG | 0.0000001 OG |
| 2 | `openai/gpt-oss-20b` | Chatbot | `0x8e60d466FD16798Bec4868aa4CE38586D5590049` | 0.00000005 OG | 0.0000001 OG |
| 3 | `google/gemma-3-27b-it` | Chatbot | `0x69Eb5a0BD7d0f4bF39eD5CE9Bd3376c61863aE08` | 0.00000015 OG | 0.0000004 OG |

**Available Models:**
- **Qwen 2.5 7B Instruct**: Fast and efficient conversational model
- **GPT-OSS-20B**: Mid-size open-source GPT alternative
- **Gemma 3 27B IT**: Google's instruction-tuned model

All testnet services feature TeeML verifiability and are ideal for development and testing.

### Mainnet Services (evmrpc.0g.ai)

| # | Model | Type | Provider | Input Price | Output Price |
|---|-------|------|----------|-------------|--------------|
| 1 | `deepseek-ai/DeepSeek-V3.1` | Chatbot | `0xd9966e13a6026Fcca4b13E7ff95c94DE268C471C` | 0.00000049 OG | 0.00000015 OG |
| 2 | `openai/whisper-large-v3` | Speech-to-Text | `0x36aCffCEa3CCe07cAdd1740Ad992dB16Ab324517` | 0.000000049 OG | 0.000000114 OG |
| 3 | `openai/gpt-oss-120b` | Chatbot | `0xBB3f5b0b5062CB5B3245222C5917afD1f6e13aF6` | 0.0000001 OG | 0.00000049 OG |
| 4 | `qwen/qwen2.5-vl-72b-instruct` | Chatbot | `0x4415ef5CBb415347bb18493af7cE01f225Fc0868` | 0.00000049 OG | 0.00000049 OG |
| 5 | `deepseek/deepseek-chat-v3-0324` | Chatbot | `0x1B3AAef3ae5050EEE04ea38cD4B087472BD85EB0` | 0.0000003 OG | 0.000001 OG |
| 6 | `flux-turbo` | Text-to-Image | `0xE29a72c7629815Eb480aE5b1F2dfA06f06cdF974` | 0.0 OG | 0.003 OG |
| 7 | `openai/gpt-oss-20b` | Chatbot | `0x44ba5021daDa2eDc84b4f5FC170b85F7bC51ef64` | 0.00000005 OG | 0.00000011 OG |

**Available Models by Type:**

**Chatbots (5 models):**
- **DeepSeek V3.1**: Latest high-performance reasoning model
- **GPT-OSS-120B**: Large-scale open-source GPT model
- **Qwen 2.5 VL 72B**: Vision-language multimodal model
- **DeepSeek Chat V3**: Optimized conversational model
- **GPT-OSS-20B**: Efficient mid-size model

**Speech-to-Text (1 model):**
- **Whisper Large V3**: OpenAI's state-of-the-art transcription model

**Text-to-Image (1 model):**
- **Flux Turbo**: Fast high-quality image generation

All services feature **TeeML** verifiability (TEE-based verification).

## 📁 Repository Structure

```
0g-compute-starter-kit/
├── src/
│   ├── config/
│   │   └── swagger.ts           # Swagger/OpenAPI configuration
│   ├── controllers/
│   │   ├── accountController.ts # Account management endpoints
│   │   └── serviceController.ts # AI service endpoints
│   ├── routes/
│   │   ├── accountRoutes.ts     # Account route definitions
│   │   └── serviceRoutes.ts     # Service route definitions
│   ├── services/
│   │   └── brokerService.ts     # Core 0G broker integration
│   ├── index.ts                 # Express app entry point
│   └── startup.ts               # Application initialization
├── demo-compute-flow.ts         # Comprehensive demo script
├── DEMO_SCRIPT.md              # Demo script documentation
├── package.json                # Project configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites

1. **Node.js** 16+ and npm
2. **Testnet ETH** for transactions ([Get from faucet](https://faucet.0g.ai))
3. **Ethereum wallet** with private key

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/0gfoundation/0g-compute-starter-kit.git
cd 0g-compute-starter-kit
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**
```bash
# Create .env file
cp .env.example .env  # if available, or create manually
```

Add your configuration to `.env`:
```env
PRIVATE_KEY=your_private_key_here_without_0x_prefix
PORT=4000
NODE_ENV=development
```

4. **Build the project:**
```bash
npm run build
```

5. **Start the server:**
```bash
npm start
```

6. **Access the API:**
- **REST API**: http://localhost:4000
- **Swagger UI**: http://localhost:4000/docs

## 🧪 Run the Complete Flow

Run the comprehensive demo script to see the entire 0G compute workflow:

```bash
npm run demo
```

This script demonstrates:
- Wallet and broker initialization
- Ledger account setup with funding (**3 OG minimum** - contract requirement in v0.6.x)
- Service discovery and provider acknowledgment
- **Fund transfer to specific provider** (required 1 OG minimum per provider)
- AI query submission with payment processing
- TEE verification and cost tracking

**Note**: When using a new wallet, you must:
1. Create a ledger with minimum **3 OG** (contract requirement)
2. Transfer at least **1 OG** to each provider before making queries

See [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) for detailed documentation.

## 📚 API Endpoints

### Account Management

#### `GET /api/account/info`
Get current account information and ledger balance.

**Response:**
```json
{
  "success": true,
  "accountInfo": {
    "ledgerInfo": ["balance_in_wei"],
    "infers": [],
    "fines": []
  }
}
```

#### `POST /api/account/deposit`
Deposit funds to your ledger account.

**Request:**
```json
{
  "amount": 0.1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Deposit successful"
}
```

#### `POST /api/account/refund`
Request refund for unused funds.

**Request:**
```json
{
  "amount": 0.05
}
```

#### `POST /api/account/add-ledger`
Create a new ledger account with initial balance. **Minimum 3 OG required** (contract requirement in v0.6.x).

**Request:**
```json
{
  "amount": 3.0
}
```

**Response:**
```json
{
  "success": true,
  "message": "Funds added to ledger successfully"
}
```

#### `POST /api/account/retrieve-funds`
Retrieve funds from sub-accounts (inference or fine-tuning) back to main ledger.

**Request:**
```json
{
  "serviceType": "inference"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Funds retrieved from inference sub-accounts successfully"
}
```

#### `DELETE /api/account/delete-ledger`
Delete the ledger account. Make sure to retrieve all funds first.

**Response:**
```json
{
  "success": true,
  "message": "Ledger deleted successfully"
}
```

### AI Services

#### `GET /api/services/list`
List all available AI services with pricing and verification status.

**Response:**
```json
{
  "success": true,
  "services": [
    {
      "provider": "0xf07240Efa67755B5311bc75784a061eDB47165Dd",
      "model": "llama-3.3-70b-instruct",
      "serviceType": "inference",
      "url": "https://...",
      "inputPrice": "1000000000000000",
      "outputPrice": "2000000000000000",
      "verifiability": "TeeML",
      "isOfficial": true,
      "isVerifiable": true
    }
  ]
}
```

#### `POST /api/services/acknowledge-provider`
Acknowledge a provider before using their services (Step 1 - required once per provider).

**Request:**
```json
{
  "providerAddress": "0xf07240Efa67755B5311bc75784a061eDB47165Dd"
}
```

#### `POST /api/services/transfer-to-provider`
Transfer funds to a specific provider (Step 2 - REQUIRED before making queries, minimum 1 OG).

**Request:**
```json
{
  "providerAddress": "0xf07240Efa67755B5311bc75784a061eDB47165Dd",
  "amount": 1.0
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully transferred 1.0 OG to provider 0xf07240Efa67755B5311bc75784a061eDB47165Dd"
}
```

#### `POST /api/services/query`
Send a query to an AI service.

**Request:**
```json
{
  "providerAddress": "0xf07240Efa67755B5311bc75784a061eDB47165Dd",
  "query": "What is the capital of France?",
  "fallbackFee": 0.01
}
```

**Response:**
```json
{
  "success": true,
  "response": {
    "content": "The capital of France is Paris.",
    "metadata": {
      "model": "llama-3.3-70b-instruct",
      "isValid": true,
      "provider": "0xf07240Efa67755B5311bc75784a061eDB47165Dd",
      "chatId": "chatcmpl-..."
    }
  }
}
```

#### `POST /api/services/settle-fee`
Manually settle fees (legacy support for specific error cases).

**Request:**
```json
{
  "providerAddress": "0xf07240Efa67755B5311bc75784a061eDB47165Dd",
  "fee": 0.000001
}
```

## 🔧 Development Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run watch        # Start development server with file watching
npm run serve        # Alternative development command

# Production
npm run build        # Compile TypeScript to JavaScript
npm start           # Start production server

# Testing
npm run demo   # Run comprehensive workflow demo
```

## 🏗️ Core Architecture

### Broker Service
The `brokerService` is a singleton that manages all interactions with the 0G Compute Network:

- **Wallet Management**: Automatic wallet initialization with ethers.js
- **Provider Operations**: Service discovery and provider acknowledgment
- **Query Processing**: AI query submission with authentication
- **Payment Handling**: Automatic micropayments and verification
- **Error Management**: Enhanced error messages with troubleshooting

### Application Initialization
On startup, the application automatically:
1. Checks for existing ledger accounts
2. Creates accounts with initial funding if needed (0.01 ETH default)
3. Logs initialization status
4. Starts the Express server

### Authentication Flow
1. **Ledger Setup**: Create ledger account with initial balance (**minimum 3 OG required** in v0.6.x)
2. **Provider Acknowledgment**: Required once per provider (on-chain transaction)
3. **Fund Transfer**: Transfer funds to specific provider (minimum 1 OG per provider required)
4. **Header Generation**: Single-use authentication headers per request
5. **Query Submission**: OpenAI-compatible API calls
6. **Response Processing**: TEE verification and payment settlement

**Important**:
- Ledger creation requires **minimum 3 OG** (contract requirement in SDK v0.6.x)
- Each provider requires **minimum 1 OG** transferred to their account before you can use their services
- The `transferFund` operation allocates funds from your ledger balance to a specific provider's account

## 🔒 Security Best Practices

1. **Environment Variables**: Store private keys securely in `.env`
2. **Input Validation**: All endpoints validate request parameters
3. **Error Sanitization**: Error messages don't expose sensitive data
4. **Single-use Headers**: Authentication headers prevent replay attacks
5. **Network Validation**: RPC endpoint verification

## 🚨 Error Handling

### Common Issues and Solutions

#### Provider Acknowledgment Required
```bash
curl -X POST http://localhost:4000/api/services/acknowledge-provider \
  -H "Content-Type: application/json" \
  -d '{"providerAddress": "0xf07240Efa67755B5311bc75784a061eDB47165Dd"}'
```

#### Insufficient Balance
```bash
# Check balance
curl http://localhost:4000/api/account/info

# Add funds
curl -X POST http://localhost:4000/api/account/deposit \
  -H "Content-Type: application/json" \
  -d '{"amount": 0.1}'
```

#### Provider Not Responding
Get alternative providers:
```bash
curl http://localhost:4000/api/services/list
```

#### Headers Already Used
The system automatically generates new headers for each request. This error indicates a system issue - retry the request.

### Legacy Error: Unsettled Previous Fee

If you encounter:
```
Error: invalid previousOutputFee: expected 0.00000000000000015900000000000001138, got 0
```

Use the settle-fee endpoint with the exact amount:
```json
{
  "providerAddress": "0x3feE5a4dd5FDb8a32dDA97Bed899830605dBD9D3",
  "fee": 0.00000000000000015900000000000001138
}
```

## 📋 Example Usage

### Complete Workflow with cURL

1. **Check available services:**
```bash
curl http://localhost:4000/api/services/list
```

2. **Check account balance:**
```bash
curl http://localhost:4000/api/account/info
```

3. **Acknowledge a provider:**
```bash
curl -X POST http://localhost:4000/api/services/acknowledge-provider \
  -H "Content-Type: application/json" \
  -d '{"providerAddress": "0xf07240Efa67755B5311bc75784a061eDB47165Dd"}'
```

4. **Transfer funds to provider (REQUIRED):**
```bash
curl -X POST http://localhost:4000/api/services/transfer-to-provider \
  -H "Content-Type: application/json" \
  -d '{"providerAddress": "0xf07240Efa67755B5311bc75784a061eDB47165Dd", "amount": 1.0}'
```

5. **Send a query:**
```bash
curl -X POST http://localhost:4000/api/services/query \
  -H "Content-Type: application/json" \
  -d '{
    "providerAddress": "0xf07240Efa67755B5311bc75784a061eDB47165Dd",
    "query": "Explain quantum computing in simple terms",
    "fallbackFee": 0.01
  }'
```

### Integration Example

```typescript
import { ethers } from 'ethers';
import { createZGComputeNetworkBroker } from '@0glabs/0g-serving-broker';
import OpenAI from 'openai';

// Initialize broker (testnet)
const provider = new ethers.JsonRpcProvider('https://evmrpc-testnet.0g.ai');
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
const broker = await createZGComputeNetworkBroker(wallet);

// Fund account (create ledger with initial balance)
await broker.ledger.addLedger(3); // Minimum 3 OG required (v0.6.x contract requirement)

// Select a provider from testnet
const providerAddress = '0x69Eb5a0BD7d0f4bF39eD5CE9Bd3376c61863aE08'; // Gemma 3 27B

// Acknowledge provider (required once per provider)
await broker.inference.acknowledgeProviderSigner(providerAddress);

// Transfer funds to provider (REQUIRED: minimum 1 OG per provider)
const transferAmount = ethers.parseEther("1.0");
await broker.ledger.transferFund(providerAddress, "inference", transferAmount);

// Get service info
const query = 'Hello, AI!';
const { endpoint, model } = await broker.inference.getServiceMetadata(providerAddress);
const headers = await broker.inference.getRequestHeaders(providerAddress, query);

// Send query
const openai = new OpenAI({ baseURL: endpoint, apiKey: '' });
const completion = await openai.chat.completions.create(
  {
    messages: [{ role: 'user', content: query }],
    model: model,
  },
  { headers }
);

// Process response (v0.6.x: argument order is providerAddress, chatId, content)
const isValid = await broker.inference.processResponse(
  providerAddress,
  completion.id,                              // chatId
  completion.choices[0].message.content || "" // content
);
```

## 🌐 Network Configuration

| Network | RPC URL | Chain ID |
|---------|---------|----------|
| **Testnet** | `https://evmrpc-testnet.0g.ai` | 16602 |
| **Mainnet** | `https://evmrpc.0g.ai` | 16661 |

- **Testnet Faucet**: https://faucet.0g.ai

## 📦 Dependencies

### Core Dependencies
- `@0glabs/0g-serving-broker@0.6.2` - 0G Compute Network SDK (latest stable version)
- `ethers@^6.11.1` - Ethereum wallet and provider functionality
- `openai@^4.28.0` - OpenAI-compatible API client
- `express@^4.18.2` - Web framework for REST API
- `dotenv@^16.4.5` - Environment variable management
- `crypto-js@^4.2.0` - Cryptographic utilities

### Development Dependencies
- `typescript` - TypeScript compiler
- `ts-node` - TypeScript execution for Node.js
- `nodemon` - Development server with hot reload
- `@types/*` - TypeScript type definitions

## 🎯 Use Cases

This starter kit is perfect for:

- **Web Applications** requiring AI integration
- **API Services** with decentralized AI backends
- **Prototyping** AI applications with micropayments
- **Learning** 0G Compute Network integration
- **Testing** different AI models and providers

## 🔄 Branch Structure

### Main Branch (Current)
REST API implementation with Express framework and Swagger documentation.

### CLI Branch
Command-line interface implementation:
```bash
git checkout cli-version
```

## 🛠️ Troubleshooting

### Common Setup Issues

1. **Missing Private Key**: Ensure `PRIVATE_KEY` is set in `.env`
2. **Insufficient ETH**: Get testnet ETH from the faucet
3. **Network Issues**: Check connectivity to 0G testnet
4. **Port Conflicts**: Change `PORT` in `.env` if 4000 is in use

### Performance Tips

1. **Provider Selection**: Use official providers for best reliability
2. **Balance Management**: Maintain sufficient OG tokens for queries
3. **Error Handling**: Implement proper retry logic in production
4. **Rate Limiting**: Consider implementing rate limits for public APIs

## 🔗 Additional Resources

- **0G Compute Documentation**: https://docs.0g.ai/developer-hub/building-on-0g/compute-network/inference
- **0G Main Website**: https://0g.ai
- **Discord Support**: https://discord.gg/0glabs
- **Demo Script Guide**: [DEMO_SCRIPT.md](./DEMO_SCRIPT.md)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Ready to build with decentralized AI? Start with `npm run demo` to see the magic happen!* ✨