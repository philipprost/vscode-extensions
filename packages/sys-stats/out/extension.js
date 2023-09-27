"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const systeminformation_1 = require("systeminformation");
function updateCpuUsageStatusBarItem(statusBarItem) {
    (0, systeminformation_1.currentLoad)().then((data) => {
        let load = data.avgLoad.toFixed(2);
        statusBarItem.text = `$(heart) CPU Load: ${load}%`;
        statusBarItem.show();
    });
}
function updateCpuSpeedStatusBarItem(statusBarItem) {
    (0, systeminformation_1.cpuCurrentSpeed)().then((data) => {
        let load = data.avg.toFixed(2);
        statusBarItem.text = `$(clock) CPU Speed: ${load}%`;
        statusBarItem.show();
    });
}
function activate(context) {
    const cpuUsagestatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    const cpuSpeedStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 50);
    cpuUsagestatusBarItem.command = "extension.showCpuLoad";
    cpuSpeedStatusBarItem.command = "extension.showCpuSpeed";
    context.subscriptions.push(cpuUsagestatusBarItem);
    context.subscriptions.push(cpuSpeedStatusBarItem);
    // update status bar item every 2 seconds
    setInterval(() => updateCpuUsageStatusBarItem(cpuUsagestatusBarItem), 2000);
    setInterval(() => updateCpuSpeedStatusBarItem(cpuSpeedStatusBarItem), 2000);
    let disposable = vscode.commands.registerCommand("sys-stats.helloWorld", () => {
        vscode.window.showInformationMessage("Showing CPU Load in status bar.");
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map