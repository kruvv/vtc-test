#!/bin/bash

base=$(basename $1)

case $base in
 cso)
  host=test-cso
  home=/home/configs/AISVTS
  user=root
 ;;
 help)
  host=bttest
  home=/home/configs/VTS
  user=root
 ;;
esac
scp $2 $user@$host.vtcservice.ru:$home/${3//\\//}
