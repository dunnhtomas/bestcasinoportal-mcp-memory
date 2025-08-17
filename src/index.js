#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class BestCasinoPortalMemoryKeeper {
  constructor() {
    this.server = new Server(
      {
        name: 'bestcasinoportal-memory-keeper',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupHandlers();
    this.initializeStorage();
  }

  async initializeStorage() {
    this.dataDir = process.env.DATA_DIR || path.join(__dirname, '..', 'memory-data');
    this.projectName = process.env.PROJECT_NAME || 'BestCasinoPortal_SEO';
    this.channel = process.env.CHANNEL || 'casino-portal-unified';
    this.serverIP = '193.233.161.161'; // Updated server IP
    
    await fs.ensureDir(this.dataDir);
    await fs.ensureDir(path.join(this.dataDir, 'backups'));
    await fs.ensureDir(path.join(this.dataDir, 'sessions'));
    await fs.ensureDir(path.join(this.dataDir, 'context'));
    
    this.contextFile = path.join(this.dataDir, 'context', 'project-context.json');
    this.sessionFile = path.join(this.dataDir, 'sessions', 'current-session.json');
    
    await this.loadContext();
  }

  async loadContext() {
    try {
      if (await fs.pathExists(this.contextFile)) {
        this.context = await fs.readJson(this.contextFile);
      } else {
        this.context = {
          project: this.projectName,
          server: {
            ip: this.serverIP,
            updated: new Date().toISOString(),
            environment: 'production',
            status: 'active'
          },
          architecture: {
            pattern: 'casino.ca',
            backend: 'PHP 8.1+',
            frontend: 'Vue.js 3+',
            database: 'PostgreSQL',
            cache: 'Redis',
            testing: 'Playwright (mandatory)',
            security: 'Enterprise-grade'
          },
          phases: {
            discovery: 'completed',
            infrastructure: 'completed',
            agent_orchestration: 'completed',
            backend_development: '95%',
            frontend_development: 'completed',
            testing_infrastructure: '95%',
            context_management: 'completed'
          },
          current_focus: 'Final error resolution and deployment preparation',
          critical_metrics: {
            total_errors: 498,
            priority_1_errors: 'MCP Memory Keeper Dependencies',
            priority_2_errors: 'TypeScript Schema Exports', 
            priority_3_errors: 'Playwright Test Signatures',
            priority_4_errors: 'TypeScript Type Annotations'
          },
          deployment_status: {
            server_ready: true,
            ssl_configured: true,
            security_hardened: true,
            performance_optimized: true,
            tests_pending: true
          },
          agents: {
            senior_php_architect: 'active',
            vue_component_specialist: 'active',
            playwright_testing_specialist: 'active',
            security_auditor: 'active',
            performance_optimizer: 'active'
          },
          created: new Date().toISOString(),
          updated: new Date().toISOString()
        };
        await this.saveContext();
      }
    } catch (error) {
      console.error('Error loading context:', error);
      this.context = { error: 'Failed to load context', timestamp: new Date().toISOString() };
    }
  }

  async saveContext() {
    try {
      this.context.updated = new Date().toISOString();
      await fs.writeJson(this.contextFile, this.context, { spaces: 2 });
      
      // Create backup
      const backupFile = path.join(
        this.dataDir, 
        'backups', 
        `context-backup-${new Date().toISOString().replace(/[:.]/g, '-')}.json`
      );
      await fs.writeJson(backupFile, this.context, { spaces: 2 });
      
      return true;
    } catch (error) {
      console.error('Error saving context:', error);
      return false;
    }
  }

  setupHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'memory_save',
            description: 'Save important project context and updates to persistent memory',
            inputSchema: {
              type: 'object',
              properties: {
                content: {
                  type: 'string',
                  description: 'Context or update to save'
                },
                category: {
                  type: 'string',
                  description: 'Category: server, architecture, progress, error, deployment, agent',
                  enum: ['server', 'architecture', 'progress', 'error', 'deployment', 'agent', 'general']
                },
                priority: {
                  type: 'string',
                  description: 'Priority level',
                  enum: ['critical', 'high', 'medium', 'low']
                }
              },
              required: ['content']
            }
          },
          {
            name: 'memory_get',
            description: 'Retrieve project context and status from persistent memory',
            inputSchema: {
              type: 'object',
              properties: {
                category: {
                  type: 'string',
                  description: 'Specific category to retrieve or "all" for complete context',
                  enum: ['server', 'architecture', 'progress', 'error', 'deployment', 'agent', 'all']
                }
              }
            }
          },
          {
            name: 'memory_update_server',
            description: 'Update server information including IP address',
            inputSchema: {
              type: 'object',
              properties: {
                ip: {
                  type: 'string',
                  description: 'Server IP address'
                },
                status: {
                  type: 'string',
                  description: 'Server status',
                  enum: ['active', 'maintenance', 'down']
                },
                environment: {
                  type: 'string',
                  description: 'Environment type',
                  enum: ['production', 'staging', 'development']
                }
              },
              required: ['ip']
            }
          },
          {
            name: 'memory_checkpoint',
            description: 'Create a checkpoint of current project state',
            inputSchema: {
              type: 'object',
              properties: {
                description: {
                  type: 'string',
                  description: 'Description of this checkpoint'
                }
              },
              required: ['description']
            }
          }
        ]
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'memory_save':
            return await this.handleMemorySave(args);
          case 'memory_get':
            return await this.handleMemoryGet(args);
          case 'memory_update_server':
            return await this.handleServerUpdate(args);
          case 'memory_checkpoint':
            return await this.handleCheckpoint(args);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: `Error executing ${name}: ${error.message}`
          }],
          isError: true
        };
      }
    });
  }

  async handleMemorySave(args) {
    const { content, category = 'general', priority = 'medium' } = args;
    
    if (!this.context.updates) {
      this.context.updates = [];
    }
    
    const update = {
      id: uuidv4(),
      content,
      category,
      priority,
      timestamp: new Date().toISOString()
    };
    
    this.context.updates.unshift(update);
    
    // Keep only last 100 updates
    if (this.context.updates.length > 100) {
      this.context.updates = this.context.updates.slice(0, 100);
    }
    
    // Update specific category data
    if (category === 'server') {
      this.context.server = { ...this.context.server, lastUpdate: content };
    } else if (category === 'error') {
      if (!this.context.errors) this.context.errors = [];
      this.context.errors.unshift({ content, timestamp: new Date().toISOString() });
    }
    
    await this.saveContext();
    
    return {
      content: [{
        type: 'text',
        text: `✅ Memory saved: ${category} update (${priority} priority)\nContent: ${content}\nTimestamp: ${update.timestamp}`
      }]
    };
  }

  async handleMemoryGet(args) {
    const { category = 'all' } = args;
    
    let result;
    
    if (category === 'all') {
      result = this.context;
    } else {
      result = this.context[category] || `No data found for category: ${category}`;
    }
    
    return {
      content: [{
        type: 'text',
        text: `📋 Memory Retrieved (${category}): \n${JSON.stringify(result, null, 2)}`
      }]
    };
  }

  async handleServerUpdate(args) {
    const { ip, status = 'active', environment = 'production' } = args;
    
    this.context.server = {
      ...this.context.server,
      ip,
      status,
      environment,
      updated: new Date().toISOString()
    };
    
    await this.saveContext();
    
    return {
      content: [{
        type: 'text',
        text: `🔄 Server Updated:\nIP: ${ip}\nStatus: ${status}\nEnvironment: ${environment}\nUpdated: ${this.context.server.updated}`
      }]
    };
  }

  async handleCheckpoint(args) {
    const { description } = args;
    
    const checkpoint = {
      id: uuidv4(),
      description,
      context: JSON.parse(JSON.stringify(this.context)),
      timestamp: new Date().toISOString()
    };
    
    const checkpointFile = path.join(
      this.dataDir,
      'backups',
      `checkpoint-${checkpoint.id}.json`
    );
    
    await fs.writeJson(checkpointFile, checkpoint, { spaces: 2 });
    
    if (!this.context.checkpoints) {
      this.context.checkpoints = [];
    }
    
    this.context.checkpoints.unshift({
      id: checkpoint.id,
      description,
      timestamp: checkpoint.timestamp
    });
    
    // Keep only last 20 checkpoint references
    if (this.context.checkpoints.length > 20) {
      this.context.checkpoints = this.context.checkpoints.slice(0, 20);
    }
    
    await this.saveContext();
    
    return {
      content: [{
        type: 'text',
        text: `💾 Checkpoint Created:\nID: ${checkpoint.id}\nDescription: ${description}\nTimestamp: ${checkpoint.timestamp}`
      }]
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('🎰 BestCasinoPortal MCP Memory Keeper started on:', this.serverIP);
  }
}

const memoryKeeper = new BestCasinoPortalMemoryKeeper();
memoryKeeper.run().catch(console.error);