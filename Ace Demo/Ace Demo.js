
app.SetDebugEnabled( true );
app.SetOnError( OnError );

function OnError(msg,line,file)
{
  app.Debug( msg );
  app.Debug( "on line " + line + " of file '" + file +"'" )
}

//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	

	//Create a text label and add it to layout.
	txt = app.CreateText( "Ace Demo" );
	txt.SetTextSize( 18 );
  txt.SetTextColor( "#bada55" );
	lay.AddChild( txt );

	web = app.CreateWebView( 0.9, 0.9, "IgnoreErrors" );
  web.LoadUrl( "index.html" );
  lay.AddChild( web );
	
	//Add layout to app.	
	app.AddLayout( lay );
}