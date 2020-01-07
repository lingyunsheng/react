diff算法的使用

基于的假设：

- 两个相同组件产生类似的DOM结构，不同的组件产生不同的DOM结构；
- 对于同一层次的一组子节点，它们可以通过唯一的id进行区分。

我们先根据真实DOM生成一颗`virtual DOM`，当`virtual DOM`某个节点的数据改变后会生成一个新的`Vnode`，然后`Vnode`和`oldVnode`作对比，发现有不一样的地方就直接修改在真实的DOM上，然后使`oldVnode`的值为`Vnode`。

虚拟DOM其实可以理解为一个对象，但是这个对象的构造很像树，为什么会这个样子，是因为这个样子会会和节点很像，因为父节点和子节点

Vue的Diff算法只与同级的节点比较，一旦发现与该节点不同，就会对该节点进行替换

在算法的开始我们设置了四个哨兵节点，oldStartIdx、newStartIdx、oldEndIdx、newEndIdx

然后对oldVnode与newVnode进行判断

- 判断1：oldStartVnode是否为空，若为true则oldStartIdx向后移动，继续下一个节点的判断。

  ```javascript
  if (isUndef(oldStartVnode)) {
      // 更新哨兵
      oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
  }
  ```

  

- 判断2：oldEndVnode是否为空，若为true则oldEndIdx向前移动。

  ```javascript
  else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx]
  }
  ```

- 使用 sameVnode判断oldVnode和newVnode未判断的头节点是否为相同节点，若为true，则按照上面思路说的，对相同类型节点进行节点的属性的更新并修改哨兵位置。

  ```javascript
  else if (sameVnode(oldStartVnode, newStartVnode)) {
      // 更新节点内容
      patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
      // 更新哨兵
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
  }
  ```

- 判断4：使用上一步相同的方法对oldEndVnode和newEndVnode进行判断。并执行相同的更新操作。

  ```javascript
  else if (sameVnode(oldEndVnode, newEndVnode)) {
      patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
      // 更新哨兵
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
  }
  ```

- 判断5：使用sameVNode判断旧列表的头节点和新列表的尾节点进行判断，sameVnode(oldStartVnode, newEndVnode)，若为true则将真实的DOM节点移动到末尾

  ```javascript
  else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
      patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
      // 真实DOM移动到真实节点列表的最后面
      canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
      // 更新哨兵
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
  }
  ```

- 判断6：使用sameVnode比较旧列表的尾节点和新列表的头节点，若为true，和上面一样，更新相同节点，将oldEndVnode放到真实节点列表的最开始。

  ```
  else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
      patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
      // 真实DOM移动到真实节点列表最前面
      canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
  } 
  ```

- 判断7：如果都不符合上述要求，那么会吧newStartIdx节点与oldVnode的所有节点进行比较，匹配成功就在真实dom中将成功的节点移到最前面，如果依旧没有成功的，那么将`newStartIdx对应的节点`插入到dom中对应的`oldStartIdx`位置，`oldStartIdx`和`newStartIdx`指针向中间移动。



最后循环结束，就会循环一篇oldVnode，把没有的节点进行删除