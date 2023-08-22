
// native list drag & drop demo by symbroson

const removeInsert = true; // setList / removeInsert item
const selectItem = true;
const factor = 2; // scroll speed factor
const offset = 2; // scroll position
const len = 50; // list length

var mnu =	[];
var L2l = (l, n=3) => l.map(o => [o.title, o.body, o.icon].slice(0, n).join(':'));

//Called when application is started.
function OnStart()
{
   app.SetDebug('console');
   for(var i = 0; i++ < len; ) mnu.push({ "title": "item at index " + i })
   //Create a layout with objects vertically centered.
   layabs = app.CreateLayout("Absolute", "FillXY,TouchSpy");
   layabs.SetOnTouch(lay_OnTouch);

   lay = app.AddLayout(layabs, "linear", "VCenter,FillXY");

   laylst = app.AddLayout(lay, "linear");
   lst = app.AddList(laylst, L2l(mnu, 1), .8, .5);
   lst.SetOnLongTouch(startDrag);

   app.AddLayout(layabs);
   lst.h = lst.GetHeight() / mnu.length;
   lst.t = lst.GetPosition("screen").top;
}

function startDrag(t, b, c, i)
{
   // list info without dragged elem
   d.s = L2l([mnu[i]], 1);
   d.l = L2l(mnu, 1);
   d.l.splice(i, 1);
   d.i = d.p = d.q = i

   // dummy list
   if(!d.e)
   {
      d.e = app.CreateList(d.s, .4);
      d.e.SetBackColor('#22ffffff');
      d.e.Hide();
      layabs.AddChild(d.e)
   }
   else d.e.SetList(d.s);
   if(selectItem) lst.SelectItemByIndex(d.p);

   // dummy list info
   d.h = d.e.GetHeight();
   d.w = d.e.GetWidth();
   d.e.v = 1;
}

d = { e: null, w: 0, h: 0, p:0, q:0 }
function lay_OnTouch(ev)
{
   if(!(d.e && d.e.v)) return;
   if(!d.ly) d.ly = ev.Y;
   // drop
   if(ev.action == 'Up')
   {
      // apply in source list
      mnu.splice(d.p, 0, mnu.splice(d.i, 1)[0]);
      if(selectItem) lst.SelectItem(null);
      d.e.v = d.ly = 0;
      return d.e.Hide();
   }

   // drag performance 30ms
   if(Date.now() - d.t < 30) return;
   d.t = Date.now();
   var ox = ev.X > .5 ? -d.w - .1 : .1;
   d.e.SetPosition(ev.X + ox, ev.Y - d.h / 2);
   if(d.e.v == 1) d.e.Show(), d.e.v++;

   // calculate index
   var p = Math.round(d.q += factor * mnu.length * (ev.Y - d.ly));
   d.ly = ev.Y;
   if(p < 0) p = 0;
   var w = removeInsert*1;
   if(p >= mnu.length-w) p = mnu.length - w;
   if(d.p == p) return;

   // upd list performance 100ms
   if(Date.now() - d.t2 < 100) return;
   d.t2 = Date.now();
   
   if(removeInsert)
   {
      lst.RemoveItemByIndex(d.p)
      lst.InsertItem(p, mnu[d.i].title);
   }
   else
   {
      var l = [...d.l];
      l.splice(p, 0, d.s);
      lst.SetList(l);
   }
   d.p = p;

   if(selectItem) lst.SelectItemByIndex(d.p);
   lst.ScrollToItemByIndex(p - offset);
}