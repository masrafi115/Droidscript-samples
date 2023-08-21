function isArray ( obj ) { return isObject(obj) && (obj instanceof Array); }

function isObject ( obj ) { return obj && (typeof obj === "object"); }
function OnStart(){
CreateSetValuesDlg();

lay66= app.CreateLayout( "Linear", "VCenter,FillXY" );
 Array.prototype.unique = function() { return this.filter(function (value, index, self) { return self.indexOf(value) === index; }); }
 
 
 dsdata = readAsJson("templates.json");
 dsbase = readAsJson("app-base.json");
 
 mydata = Object.entries(dsdata) ;
mybase = Object.entries(dsbase) ;
 
 lst = [];
 fl = [];
 rl = [];
 
 //app.Alert( dsbase["#2576212953"].pNames);
 
 
 for (var i = 0 ; i < mydata.length ; i++) {
 
 if ((!!mydata[i][1].subf) && (!!mydata[i][1].subf.Gone)) lst.push(([mydata[i][0],mydata[i][1].subf]))   
 
     
 }
 for (var j = 0 ; j < lst.length ; j++) {
 
 fl = Object.entries(lst[j][1])
 //app.Alert( fl.join("\n"));
 
 for (var k = 0 ; k < fl.length ; k++) {
 
  if ((fl[k][0].slice(0,3) == 'Set') )
  
 {   if (typeof(fl[k][1]) === 'object')
{ if (typeof(fl[k][1].pTypes[0]) != 'object')
 //{rl.push([lst[j][0],fl[k][0],"P",fl[k][1].pNames,"T",fl[k][1].pTypes]) } else {};
 rl.push(fl[k][1].pTypes.join("€") )
 }
  else
{  if (typeof (dsbase[fl[k][1]].pTypes[0]) != 'object')
    
{// rl.push([lst[j][0],fl[k][0],"P",dsbase[fl[k][1]].pNames,"T",dsbase[fl[k][1]].pTypes]) 
 rl.push(dsbase[fl[k][1]].pTypes.join("€")) 
   } else {};};

// {rl.push(["$",fl[k][1],dsbase[fl[k][1]].pNames])}
 //    {rl.push(["$",fl[k][1],])}
  };
 
 
}
 }
 
     btn = app.CreateButton( "GetObjectsList" );
    btn.SetOnTouch( DisplayObjectsList);
    lay66.AddChild( btn );
 
 
    btn = app.CreateButton( "GetobjectsList" );
    btn.SetOnTouch( SayHello );
    lay66.AddChild( btn );
 app.AddLayout( lay66 );
 
    btn = app.CreateButton( "Getproperties" );
        btn.SetTextColor( "#22ff22" );
        btn.codebuilder = {};
        btn.codebuilder.v1 = "value";

    btn.SetOnTouch(  function ()
{
	var objs = app.GetObjects();
	me=this.id ;
	app.Alert(JSON.stringify(objs[me], null, 4)) ;

}
);
    lay66.AddChild( btn );
 
     spin = app.CreateSpinner(GetObjectsList(dsdata) , 0.6 );
// spin.SetList("a,b,c");
 
spin.SetEnabled(false)
// spin.SetList(GetObjectsList(dsdata))
 spin.SelectItem("Button")
 spin.SetEnabled(true)
 
 spin.SetTextSize(15);
   
     
    spin.SetOnChange( function (item)
{
	app.ShowPopup( item); 
	spin72.SetList( GetMethodsList(item,dsdata));
	dlg.SetTitle( "Set "+item+" properties" );
	dlg.Show();
}
);
    //spin.SelectItem( "Frodo" );
    lay66.AddChild( spin );


 
 
dlg = app.CreateDialog( "Advanced") ;
laydlg = app.CreateLayout( "Linear", "VCenter,FillXY" );
 laydlg.SetSize( 0.8,0.5 );
 spin72 = app.CreateSpinner( "Choose a property to modify,p1,p2" , -1 , -1 , "Normal" );
 laydlg.AddChild( spin72 );
 
 spin73 = app.CreateSpinner(  "Choose a property to add, p1, p2" , -1 , -1 , "Normal" );
 //spin73.SetList(GetMethodsList("Button", dsdata)  );
 spin72.SetOnChange( function (item)
{
//app.ShowPopup( spin.GetText() );
//txt74.SetText( GetParamsList(spin.GetText(), item,dsdata,dsbase));
	dlgValues.SetValues(spin.GetText(), item);
	dlgValues.Show();
}
 );
 laydlg.AddChild( spin73 );
 
     btn = app.CreateButton( "Ok" );
    btn.SetOnTouch( HideDlg);
    laydlg.AddChild( btn );
 
dlg.AddLayout( laydlg );
// dlgValues.Show();
//writeAsJson("dataset.json",Object.fromEntries(lst));
//app.
//app.Alert( GetParamsList("Button","SetSize", dsdata,dsbase))



 }

function SayHello()
{
	app.Alert( rl.join("€").split("€").unique().join("\n##"));
}

function writeAsJson(path,obj)
{
    app.WriteFile(path,JSON.stringify(obj, null, 4));
}
 
function readAsJson(path)
{
    if (app.FileExists(path))
      return JSON.parse(app.ReadFile(path));
    app.ShowPopup(path+" does not exist");
    return undefined;
}

function DisplayObject(id)
{
	var objs = app.GetObjects();
	
	app.Alert(JSON.stringify(objs.id, null, 4)) ;
}

function DisplayObjectsList()
{

//	list  = GetObjectsList(dsdata);
 list  = GetMethodsList("Button",dsdata);
	app.Alert( list );
}

function HideDlg()
{
	dlg.Hide();
	app.Exit(  );
}

function GetParamsList(objtype, method, jsondata,jsonbase)
{
r = []
p = jsondata["Create" + objtype].subf[method]
r

if (typeof(p) !=  'object')
p  = jsonbase[p];

r.push(p.pNames);
r.push(p.pTypes);

r.push(jsondata["Create" + objtype].subf[method].pNames)
r.push(jsondata["Create" + objtype].subf[method].pTypes)

return r
}


function GetObjectsList(jsondata)
{
excludelist=["Layout","Tabs","Scroller","Dialog"]
objectslist  = []
arraydata = Object.entries(jsondata) ;
	
 for (var i = 0 ; i < arraydata.length ; i++) {
 
 if ((!!arraydata[i][1].subf) 
 && (!!arraydata[i][1].subf.Gone) 
 && (!excludelist.includes(arraydata[i][1].name.slice(6))) )
 objectslist.push((arraydata[i][1].name.slice(6)))   
 };
 return objectslist.join(",");
 
 
} 

function GetMethodsList(objtype, jsondata)
{
excludelist = ["SetText", "SetTextSize", "SetFile"]
methodslist  = []
arraydata = Object.entries(jsondata["Create"+objtype].subf) ;
for (var i = 0 ; i < arraydata.length ; i++) {
 
if ((arraydata[i][0].slice(0,3) == "Set") 
&&  (arraydata[i][0].slice(0,5) != "SetOn") 
&& (!excludelist.includes(arraydata[i][0]) )
)
methodslist.push(arraydata[i][0])
}
return methodslist.join(",");
}

function CreateSetValuesDlg()
{

dlgValues = app.CreateDialog( "Property values") ;
laydlg = app.CreateLayout( "Linear", "VCenter,FillX" );
 laydlg.SetSize( 0.8,0.5 );
 
 lay72 = app.CreateLayout( "linear" , "Horizontal" );
 

 
 btn73 = app.CreateButton( "<" , -1 , -1 , "Normal" );
 btn73.SetOnTouch( btn73_OnTouch );
 lay72.AddChild( btn73 );
 
 txt74 = app.CreateText( "value 1 of 5" , -1 , -1 , "Normal" );
 lay72.AddChild( txt74 );
 
 btn75 = app.CreateButton( ">" , -1 , -1 , "Normal" );
 btn75.SetOnTouch( btn75_OnTouch );
 lay72.AddChild( btn75 );
  laydlg.AddChild( lay72 );
 
 txt76 = app.CreateText( "Size :" , -1 , -1 , "Normal" );
 laydlg.AddChild( txt76 );
 
 edt77 = app.CreateTextEdit( "New object" ,0.6 , -1 , "Normal" );
 laydlg.AddChild( edt77 );
 
 spin78 = app.CreateSpinner( "New object" , 0.6 , -1 , "Normal" );
 laydlg.AddChild( spin78 );
 
 slb81 = app.CreateSeekBar( 0.7 , -1 , "Normal" );
 
 laydlg.AddChild( slb81 );
 
 chk83 = app.CreateCheckBox( "New object" , -1 , -1 , "Normal" );
 laydlg.AddChild( chk83 );
 
 btn84 = app.CreateButton( "Ok" , -1 , -1 , "Normal" );
 laydlg.AddChild( btn84 );
 
dlgValues.AddLayout( laydlg );
//dlgValues.Show();
dlgValues.Nxt = function ()
{
btn73.SetEnabled( true );
dlgValues.index++;
// dlgValues.maxindex  = 0;
txt76.SetText( dlgValues.dlgparams[0][dlgValues.index] );
edt77.SetText(dlgValues.dlgparams[1][dlgValues.index]  );
//	dlgValues.Show();
if (dlgValues.index == dlgValues.dlgparams[0].length-1)
{return false}  else { return true };
}
dlgValues.Prv = function ()
{
dlgValues.index--;

btn75.SetEnabled( true );
// dlgValues.maxindex  = 0;
txt76.SetText( dlgValues.dlgparams[0][dlgValues.index] );
edt77.SetText(dlgValues.dlgparams[1][dlgValues.index]  );
//	dlgValues.Show();
if (dlgValues.index == 0)
{return false}  else { return true };

}
dlgValues.SetValues = function (objtype, method)
{
dlgValues.index = 0;
dlgValues.maxindex  = 0;
btn73.SetEnabled( false );
btn75.SetEnabled( true );
dlgValues.dlgparams = GetParamsList (objtype,method,dsdata,dsbase)
txt76.SetText( dlgValues.dlgparams[0][0] );
edt77.SetText(dlgValues.dlgparams[1][0]  );
if (dlgValues.dlgparams[0].length  == 1) btn75.SetEnabled( false);
//	dlgValues.Show();
}
	//dlgValues.ShowValues()
}

function btn73_OnTouch()
{
this.SetEnabled (dlgValues.Prv()) 
	
}
function btn75_OnTouch()
{
this.SetEnabled (dlgValues.Nxt()) 
	
}



function OnStart()
{
layMainpage91 = app.CreateLayout ( "linear","VCenter,FillXY" )

btn97 = app.CreateButton ( "New Button",-1,-1 );
btn97.SetOnTouch ( btn97_OnTouch );
btn97.SetOnLongTouch ( btn97_OnLongTouch );
layMainpage91.AddChild ( btn97 );

app.AddLayout ( layMainpage91 );
};

function btn97_OnTouch()
 {
app.ShowPopup( 'btn97 !' );
}

function btn97_OnLongTouch()
 {
app.ShowPopup( 'btn97 !' );
}


btn97_OnTouch()
 {
app.ShowPopup( 'btn97' ! );
}

function btn97_OnLongTouch()
 {
app.ShowPopup( 'btn97' ! );
}