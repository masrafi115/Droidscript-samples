
app.LoadScript('beautify_js.js');

var path,
    opt = {
        indent_size: 4,
        indent_char: " ",
        space_before_conditional: false,
        brace_style: "collapse"
    };

function OnStart() {
    btn_OnTouch();
    var lay = app.CreateLayout("linear", "VCenter,FillXY");

    var btn = app.CreateButton("select file");
    btn.SetOnTouch(btn_OnTouch);
    lay.AddChild(btn);

    app.AddLayout(lay);
}

function btn_OnTouch() {
    app.ChooseFile('', '', function(p) {
        var dlgFmt = app.CreateYesNoDialog('Format ' + (path = p) + '?');
        dlgFmt.SetOnTouch(function(r) {
            if(r == 'Yes') {
                app.WriteFile(path, '\n' + js_beautify(app.ReadFile(path) + '\n', opt));
                app.ShowPopup('saved to ' + path);
            }
            btn_OnTouch()
        });
        dlgFmt.Show();
    });
}