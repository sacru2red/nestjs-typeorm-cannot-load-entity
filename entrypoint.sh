#!/bin/bash

chown -R root /api-v2.bodumcare.com
cd /api-v2.bodumcare.com
npm install
npm run postinstall
eval npm run "$API_RUN_SCRIPT"
