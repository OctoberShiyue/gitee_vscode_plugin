import * as vscode from 'vscode'
import { 插件名称 } from './NAME'

export type 用户配置 = {
  令牌: string
  下载位置: string
  通知自动刷新时间: number
  仓库排序选项: string
  gitlab网址:string
}
export function 获得用户配置(): 用户配置 {
  var 令牌 = vscode.workspace.getConfiguration(插件名称).get<string>('personal_access_tokens')
  var 下载位置 = vscode.workspace.getConfiguration(插件名称).get<string>('default_location')
  var 通知自动刷新时间 = vscode.workspace.getConfiguration(插件名称).get<number>('notificationsUpdateTime')
  var 仓库排序选项 = vscode.workspace.getConfiguration(插件名称).get<string>('repoSort')
  var gitlab网址 = vscode.workspace.getConfiguration(插件名称).get<string>('gitlabhttp')

  if (令牌 == undefined) throw new Error('没有找到配置: 令牌')
  if (下载位置 == undefined) throw new Error('没有找到配置: 下载位置')
  if (通知自动刷新时间 == undefined) throw new Error('没有找到配置: 通知自动刷新时间')
  if (仓库排序选项 == undefined) throw new Error('没有找到配置: 仓库排序选项')
  if (gitlab网址 == undefined) throw new Error('没有找到配置: gitlab网址')

  if (下载位置 == '' || 下载位置 == null) {
    下载位置 = `${process.env.HOME || process.env.USERPROFILE}/gitlab`.replace(/\\/g, '/')
  } else {
    下载位置 = eval('`' + 下载位置.replace(/\\/g, '/') + '`')
  }

  if (typeof 下载位置 != 'string') {
    throw new Error('下载位置无法解析')
  }

  return {
    令牌,
    下载位置,
    通知自动刷新时间,
    仓库排序选项,
    gitlab网址,
  }
}
