
/* * * * * * * * * * * * * * * * * * * * *
 * 
 * This application uses the 
 * https://chatbot.theb.ai/#/chat
 * page provided by https://theb.ai
 *
 * ---------------------------------------
 * 
 * This application only provides support
 * to transfer DroidScript codes,
 * provide better writing support and
 * fix the copy function.
 * 
 * ---------------------------------------
 *
 * BAI may discontinue free support
 * in the future.
 *  
 * * * * * * * * * * * * * * * * * * * * */

cfg.Light, cfg.Portrait

const DSPath = app.RealPath( "/sdcard" ) + "/DroidScript"
const DSApps = app.ListFolder( DSPath )
    .filter( appName => app.ListFolder( `${DSPath}/${appName}` ).includes( `${appName}.js` ) )
    
const initalPrompt = `Please provide answers that are suitable for DroidScript application in regards to my JavaScript questions.
and answer me in this language: ${app.GetLanguage()}`.replace("\n", " ")

//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "Linear", "VCenter,FillXY" )

	web = app.CreateWebView( 1, 1 )
	web.LoadUrl( "https://chatbot.theb.ai/#/chat" )
	web.SetOnProgress( web_OnProgress )
	web.SetOnConsole( web_OnConsole )
	lay.AddChild( web )
	
	//Add layout to app.	
	app.AddLayout( lay )
	
	initPromtBuilder()
}

function web_OnProgress( prg ) {
    if( prg !== 100 ) return;
    
    const inject = `const inp = document.querySelector("textarea");
    
    const writePrompt = text => {
        inp.value = text;
        inp.dispatchEvent(new InputEvent("input"));
    }
    
    inp.onclick = ev => {
        ev.preventDefault();
        inp.blur();
        console.log("DS:prompt");
    }
    
    document.body.addEventListener("click", ev => {
        if(ev.target.matches(".code-block-header__copy")) {
            const code = ev.target.offsetParent.nextElementSibling.textContent;
            console.log("DS:code:" + code)
        }
    });
    
    writePrompt("${initalPrompt}")
    setTimeout(() => document.querySelector("footer > div > div > button").click(), 0)`
    
    web.Execute( inject )
}

function web_OnConsole( msg ) {
    if( !msg || !msg.startsWith( "DS:" ) ) return;
    
    const cmd = msg.slice( 3 );
    
    switch(true)
    {
        case cmd.startsWith("prompt"):
            showPromptBuilder()
            break;
        case cmd.startsWith("code"):
            app.SetClipboardText( cmd.slice(5) )
            app.ShowPopup( "Copied!", "Bottom" )
            break;
    }
}

function codeBtn_OnTouch() {
    const appPicker = app.CreateListDialog( "Select App", DSApps )
    appPicker.SetOnTouch( appPicker_OnTouch )
    appPicker.Show()
}

function appPicker_OnTouch( appName ) {
    const lines = app.ReadFile( `${DSPath}/${appName}/${appName}.js` )
        .split( "\n" )
        .filter( line => line.trim() )
        .map( line => [ toSafeListItem( line ) ] )
    
    const dlg = app.CreateDialog()
    
    const linePicker = app.CreateList( lines, 0.9, 0.9, "html" )
    linePicker.SetOnTouch( linePicker_OnTouch )
    dlg.AddLayout( linePicker )
    
    dlg.Show()
}

function linePicker_OnTouch( line ) {
    if(true) {
        promptInput.SetText( `${promptInput.GetText()}\n${reverseSafeListItem(line)}` )
    } else {
        const lines = promptInput.GetText().split("\n").filter( txt => txt !== line );
        promptInput.SetText( lines.join("\n") )
    }
}

function initPromtBuilder() {
    promptDialog = app.CreateDialog()
    
    const card = app.CreateLayout( "Card" )
    card.SetBackColor( "#ffffff" )
    card.SetElevation( 0 )
    card.SetCornerRadius( 15 )
    card.SetSize( 0.9 )
    promptDialog.AddLayout( card )
    
    const lay = app.AddLayout( card, "Linear", "Right,FillXY" )
    lay.SetChildMargins( 15, 5, 15, 5, "sp" )
    
    const title = app.AddText( lay, "Prompt Builder", -1, -1, "FillX,Left,Bold" )
    title.SetTextColor( "#52565b" )
    title.SetTextSize( 24, "sp" )
    
    const inpCard = app.AddLayout( lay, "Card", "FillX" )
    inpCard.SetSize( -1, 200, "dp" )
    inpCard.SetBackColor( "#f4f6f8" )
    inpCard.SetCornerRadius( 10 )
    
    promptInput = app.AddTextEdit( inpCard, "", -1, -1, "FillXY" )
    promptInput.SetBackColor( "#00000000" )
    promptInput.SetTextColor( "#52565b" )
    promptInput.SetCursorColor( "#52565b" )
    promptInput.SetHint( "Ask me anything" )
    promptInput.SetPadding( 20, 20, 20, 20, "px" )
    promptInput.SetTextSize( 12, "sp" )
    
    const codeBtn = app.AddButton( lay, "[fa-plus]", -1, -1, "FillX,FontAwesome" )
    codeBtn.SetBackColor( "#f4f6f8" )
    codeBtn.SetTextColor( "#52565b" )
    codeBtn.SetTextSize( 20, "sp" )
    codeBtn.SetSize( -1, 50, "dp" )
    codeBtn.SetOnTouch( codeBtn_OnTouch )
    
    const okBtn = app.AddButton( lay, "[fa-send]", -1, -1, "FontAwesome" )
    okBtn.SetBackColor( "#18a058" )
    okBtn.SetTextColor( "#FFFFFF" )
    okBtn.SetTextSize( 16, "sp" )
    okBtn.SetSize( 100, 50, "dp" )
    okBtn.SetOnTouch( () => {
        web.Execute(`writePrompt( \`${promptInput.GetText()}\` )`)
        promptDialog.Dismiss()
    } )
}

function showPromptBuilder() {
    promptInput.SetText( "" )
    promptDialog.Show()
}

function safePrompt( txt ) {
    return txt.replace( /"/g, "'" )
}

function toSafeListItem( text ) {
    return text.replace( /,/g, "&comma;" )
        .replace( /:/g, "&colon;" )
}

function reverseSafeListItem( text ) {
    return text.replace( /&comma;/g, "," )
        .replace( /&colon;/g, ":" )
}