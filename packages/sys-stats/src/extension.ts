import * as vscode from "vscode";
import { currentLoad, cpuCurrentSpeed } from "systeminformation";

function updateCpuUsageStatusBarItem(statusBarItem: vscode.StatusBarItem) {
  currentLoad().then((data) => {
    let load = data.avgLoad.toFixed(2);
    statusBarItem.text = `$(heart) CPU Load: ${load}%`;
    statusBarItem.show();
  });
}

function updateCpuSpeedStatusBarItem(statusBarItem: vscode.StatusBarItem) {
  cpuCurrentSpeed().then((data) => {
    let load = data.avg.toFixed(2);
    statusBarItem.text = `$(clock) CPU Speed: ${load}%`;
    statusBarItem.show();
  });
}

export function activate(context: vscode.ExtensionContext) {
  const cpuUsagestatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  const cpuSpeedStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    50
  );

  cpuUsagestatusBarItem.command = "extension.showCpuLoad";
  cpuSpeedStatusBarItem.command = "extension.showCpuSpeed";
  context.subscriptions.push(cpuUsagestatusBarItem);
  context.subscriptions.push(cpuSpeedStatusBarItem);

  // update status bar item every 2 seconds
  setInterval(() => updateCpuUsageStatusBarItem(cpuUsagestatusBarItem), 2000);
  setInterval(() => updateCpuSpeedStatusBarItem(cpuSpeedStatusBarItem), 2000);

  let disposable = vscode.commands.registerCommand(
    "sys-stats.helloWorld",
    () => {
      vscode.window.showInformationMessage("Showing CPU Load in status bar.");
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
