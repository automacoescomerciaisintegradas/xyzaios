/**
 * Health Notifier Worker
 *
 * Checks system metrics and triggers notifications if thresholds are exceeded.
 * Integrated with Cleudocode Antigravity workflows.
 *
 * @module health-notifier
 * @version 1.0.0
 */

const os = require('os');
const { execSync } = require('child_process');

/**
 * Get system health metrics
 * @returns {Object} System health data
 */
function getSystemHealth() {
    const uptime = os.uptime();
    const freemem = os.freemem();
    const totalmem = os.totalmem();
    const loadavg = os.loadavg();
    const cpus = os.cpus().length;

    return {
        uptime: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m`,
        memory: {
            free: `${(freemem / 1024 / 1024 / 1024).toFixed(2)} GB`,
            total: `${(totalmem / 1024 / 1024 / 1024).toFixed(2)} GB`,
            usage: `${((1 - freemem / totalmem) * 100).toFixed(1)}%`
        },
        load: {
            '1m': loadavg[0].toFixed(2),
            '5m': loadavg[1].toFixed(2),
            '15m': loadavg[2].toFixed(2),
            cpuCount: cpus
        },
        timestamp: new Date().toISOString()
    };
}

/**
 * Main execution function
 * @param {Object} args - Worker arguments
 */
function run(args = {}) {
    console.log('🚀 Executing Health Notifier Worker...');

    const health = getSystemHealth();
    const threshold = args.threshold || 90;

    console.log('\n📊 System Health Report:');
    console.log(`- Uptime: ${health.uptime}`);
    console.log(`- Memory Usage: ${health.memory.usage}`);
    console.log(`- Load (1m): ${health.load['1m']}`);

    const usagePercent = parseFloat(health.memory.usage);

    if (usagePercent > threshold) {
        console.log(`\n⚠️  WARNING: Memory usage (${usagePercent}%) exceeds threshold (${threshold}%)!`);
        // AIDEV-TODO: Trigger Telegram notification via Lobster workflow
        console.log('Action: Notifying admin via Telegram (simulated)');
    } else {
        console.log('\n✅ System health is within normal parameters.');
    }

    return health;
}

// Support CLI execution
if (require.main === module) {
    const args = process.argv.slice(2);
    const thresholdArg = args.find(a => a.startsWith('--threshold='));
    const threshold = thresholdArg ? parseInt(thresholdArg.split('=')[1]) : 90;

    run({ threshold });
}

module.exports = { run, getSystemHealth };
