import * as vscode from "vscode";
import {
  currentLoad,
  cpuCurrentSpeed,
  cpuTemperature,
  battery,
} from "systeminformation";

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

function updateCpuTempStatusBarItem(statusBarItem: vscode.StatusBarItem) {
  cpuTemperature().then((data) => {
    let temp = data.main.toFixed(2);
    statusBarItem.text = `$(light-bulb) CPU Temp: ${temp}C`;
    statusBarItem.show();
  });
}

function updateBatteryStatusBarItem(statusBarItem: vscode.StatusBarItem) {
  battery().then((data) => {
    const { percent } = data;
    const capacity = percent;
    statusBarItem.text = `$(light-bulb) Battery: ${capacity}%`;
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
  const cpuTempStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    20
  );
  const batteryStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    10
  );

  cpuUsagestatusBarItem.command = "extension.showCpuLoad";
  cpuSpeedStatusBarItem.command = "extension.showCpuSpeed";
  cpuTempStatusBarItem.command = "extension.showCpuTemp";
  batteryStatusBarItem.command = "extension.showBattery";
  context.subscriptions.push(cpuUsagestatusBarItem);
  context.subscriptions.push(cpuSpeedStatusBarItem);
  context.subscriptions.push(batteryStatusBarItem);
  context.subscriptions.push(cpuTempStatusBarItem);

  // update status bar item every 2 seconds
  setInterval(() => updateCpuUsageStatusBarItem(cpuUsagestatusBarItem), 2000);
  setInterval(() => updateCpuSpeedStatusBarItem(cpuSpeedStatusBarItem), 2000);
  setInterval(() => updateBatteryStatusBarItem(batteryStatusBarItem), 2000);
  setInterval(() => updateCpuTempStatusBarItem(cpuTempStatusBarItem), 2000);

  let disposable = vscode.commands.registerCommand(
    "sys-stats.helloWorld",
    () => {
      vscode.window.showInformationMessage("Showing CPU Load in status bar.");
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
