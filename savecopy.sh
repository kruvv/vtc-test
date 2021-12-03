#!/bin/bash
echo $1
echo $2
echo $3

base=$(basename $1)
echo $base
exit 0

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
echo scp $2 $user@$host.vtcservice.ru:$home/${3//\\//}
