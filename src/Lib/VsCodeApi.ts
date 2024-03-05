import * as vscode from 'vscode'
import { 插件名称 } from './NAME'

export var 注册命令 = (context: vscode.ExtensionContext, 名称: string, 函数: (...a: any[]) => Promise<void>) =>
  context.subscriptions.push(vscode.commands.registerCommand(`${插件名称}.${名称}`, 函数))
export var 执行命令 = (名称: string, ...a: any[]) => vscode.commands.executeCommand(`${插件名称}.${名称}`, ...a)
export var 提示 = (s: string) => vscode.window.showInformationMessage(s)
export var 当配置修改时 = (f: () => void) => vscode.workspace.onDidChangeConfiguration(f)

/*
    id:
        在package.json里注册的树目录id
    计算函数:
        计算某个节点的子节点, 输入是目标节点的数据, 返回的是该节点的子节点数据, 都是自定义数据
    转换函数:
        实际展示时, vscode无法理解自定义数据, 需要将其转换为TreeItem类型的数据
        如果该项有子项, TreeItem中的collapsibleState必须正确设置
*/
var _设置树数据 = <自定义数据>(
  id: string,
  计算函数: (a: 自定义数据 | undefined) => vscode.ProviderResult<自定义数据[]>,
  转换函数: (a: 自定义数据) => vscode.TreeItem,
) => {
  var 数据改变事件 = new vscode.EventEmitter<void>()

  vscode.window.registerTreeDataProvider<自定义数据>(id, {
    getChildren: 计算函数,
    getTreeItem: 转换函数,
    onDidChangeTreeData: 数据改变事件.event,
  })

  数据改变事件.fire()
}

/*
    简单的设置单层树视图
    id:
        在package.json里注册的树目录id
    数据:
        一个自定义数据的数组, 每个项都是一个根节点上的项
        不支持子树
    转换函数:
        描述自定义数据如何转换为TreeItem
*/
export var 设置树数据 = <自定义数据>(id: string, 数据: 自定义数据[], 转换函数: (a: 自定义数据) => vscode.TreeItem) => {
  _设置树数据<自定义数据>(id, (a) => (a == null ? 数据 : []), 转换函数)
}
