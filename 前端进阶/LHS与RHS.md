LHS查询出现在 赋值操作时，RHS出现在右侧对变量进行查询

LHS查询是查找带变量的容器本身

AST树其实就是一个对象类型的树，最外会的根就是全局作用域，每个作用域的各自的属性以及对象。

```javascript
function add(a, b) {
    return a + b
}
```



首先，我们拿到的这个语法块，是一个FunctionDeclaration(函数定义)对象。

用力拆开，它成了三块：

- 一个id，就是它的名字，即add
- 两个params，就是它的参数，即[a, b]
- 一块body，也就是大括号内的一堆东西

add没办法继续拆下去了，它是一个最基础Identifier（标志）对象，用来作为函数的唯一标志，就像人的姓名一样。

```javascript
{
    name: 'add'
    type: 'identifier'
    ...
}
```

params继续拆下去，其实是两个Identifier组成的数组。之后也没办法拆下去了。

```javascript
[
    {
        name: 'a'
        type: 'identifier'
        ...
    },
    {
        name: 'b'
        type: 'identifier'
        ...
    }
]
```

其实AST就是一个用对象做成的树，里面包含了变量，函数等在声明之后都会在这里生产一个特定的节点存在于其中，如果需要查询一个变量，其实就是对其中的节点的children节点进行查询或者向上查询，这就是作用域