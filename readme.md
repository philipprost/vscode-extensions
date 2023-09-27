# Overview

This is a collection of extensions for visual studio code and includes helpers but also
gimmick extensions. To install any of those you only need to use the package command and
the extension you would like to use, like so `yarn package:<extension>`.

## Requirements

Run `yarn install` to install all package dependencies and then check for individual
scripts in package.json.

For packaging, you require the `vsce` package, make sure you ran `npm install -g vsce`.

## Packages

### Sys-Stats

## Adding new extensions

Make sure you have the vscode extension generator installed, otherwise run `npm install -g yarn yo generator-code` and then run `yo code` within the <strong>packages</strong> directory.
