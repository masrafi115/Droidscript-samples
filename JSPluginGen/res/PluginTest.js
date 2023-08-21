
app.LoadPlugin("timbaktu");

function OnStart() {
    plg = app.Createtimbaktu();

    var lay = app.CreateLayout("Linear", "VCenter,FillXY");
    btn = app.CreateButton("GetVersion");
    btn.SetOnTouch(CallPlugin);
    lay.AddChild(btn);
    app.AddLayout(lay);
}

function CallPlugin() {
    alert(plg.GetVersion());
}