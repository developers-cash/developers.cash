#!/bin/bash

action=$1

case "$action" in
"deploy")
  quasar build -m ssr
  rsync -rP ./dist/ssr/ root@developers.cash:/root/apps/developers.cash/developers.cash
  ssh root@developers.cash 'cd /root/apps/developers.cash/ && cd developers.cash && npm update && cd ../ && docker-compose down && docker-compose up -d'
  ;;
*)
  echo 'Usage: ./scripts <command> (arguments)'
  echo 'Commands:'
  echo 'deploy - Deploy to SFTP'
  ;;
esac


