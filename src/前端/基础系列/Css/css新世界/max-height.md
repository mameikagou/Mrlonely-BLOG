
展开-收起的纯css实现
<https://demo.cssworld.cn/3/3-2.php>

```html
HTML：
<input id="check" type="checkbox">
<p>个人觉得，...</p>
<div class="element">
  <p>display:table-cell其他...</p>
</div>
<label for="check" class="check-in">更多↓</label>
<label for="check" class="check-out">收起↑</label>

<!-- CSS： -->
 <style>
.element {
  max-height: 0;
  overflow: hidden;
  transition: max-height .25s;
}
:checked ~ .element {
  max-height: 666px;
}
</style>
```