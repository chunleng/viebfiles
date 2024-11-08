#!/usr/bin/env bash

set -eu

OUTPUT_FILE=$TMPDIR/vieb_qrcode.png
/opt/homebrew/bin/qrencode $1 -o $OUTPUT_FILE -s 10
open $OUTPUT_FILE
