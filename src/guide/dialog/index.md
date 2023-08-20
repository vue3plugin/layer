---
title: 演示
outline: [1,2]
---
# useLayerDialog （  弹窗组件）

## 概要

意在打造一个自由弹窗，可根据自身需求定制。

1. 支持自由拖动
2. 指定拖动边界
3. 支持锁定边界，避免弹窗超出边界

## 整个窗口弹出

<preview path="./demo/demo.vue" />

## 在指定区域弹出


<preview path="./demo/demo2.vue" />

## 禁止拖动超出边界
<preview path="./demo/demo3.vue" />

##  Api

`const { style, setPlacement } = useLayerDialog(target, LayerDialogProps)`

---
-  参数
### target 目标操作元素

|参数名称|是否必填|描述|默认值|类型|
|-|-|-|-|-|
|target|是|目标元素|无|Ref|

### LayerDialogProps

|参数名称|是否必填|描述|默认值|类型|
|-|-|-|-|-|
|placement|否|代表元素在目标窗口显示的相对位置,可选值：'auto' ， 't' ， 'b' ， 'l' ， 'r' ， 'rb' ， 'rt' ， 'lt' ， 'lb' ， [number, number]|`auto`|`string` or `[number,number]`|
|to|否|代表显示的目标容器|无|Ref|
|lockBoundary|否|是否锁定边界，防止元素滑动到屏幕之外|`false`|`boolean`|

---

- 返回值

|参数名称|描述|默认值|类型|
|-|-|-|-|
|style|属性，用于位置样式填充|-|-|
|setPlacement|函数，动态设置元素位置，可选值：'auto' ， 't' ， 'b' ， 'l' ， 'r' ， 'rb' ， 'rt' ， 'lt' ， 'lb' ， [number, number]|无|`string` or `[number,number]`|