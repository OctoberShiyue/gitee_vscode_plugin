cur_dir=`dirname $BASH_SOURCE`
source $cur_dir/Lib/获取项目名称.sh
source $cur_dir/Lib/获取项目版本.sh

echo "请输入token"
read token
vsce publish -p $token --packagePath cur_dir/../$ProName-$ProVersion.vsix
