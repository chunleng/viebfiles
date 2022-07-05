#!/bin/bash

set -eu

APP_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}"  )" && pwd  )"

mkdir -p ~/Library/Application\ Support/Vieb/colors
ln -sfn $APP_PATH/viebrc ~/Library/Application\ Support/Vieb/viebrc
ln -sfn $APP_PATH/colors/custom.css ~/Library/Application\ Support/Vieb/colors/custom.css
