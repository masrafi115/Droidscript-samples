//-------------------------------------------------------------------------
// This sample demonstrates how to create an Android app from a stencyl
// game exported as HTML5. See http://www.stencyl.com for more info.
//
// Note: We have renamed the AlienApproach.js file to AlienApproach.js_
// to prevent it slowing down the DroidScript editor.
//-------------------------------------------------------------------------

//Called when application is started.
function OnStart()
{
    //Check OS version.
    //(Sounds won't work on older systems)
    if( app.GetOSVersion() < 21 ) 
        alert("This demo requires Android Lollipop or greater");
        
    //Lock screen orientation to Landscape.
    app.SetOrientation( "Landscape" );
    
    //Set full screen game mode.
    app.SetScreenMode( "Game" );
    
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );
	
	//Create a transparent layout over the WebView for controls.
	layCtrl = app.CreateLayout( "Absolute", "FillXY" );
	
	//Create a left move button.
	btnLeft = app.CreateImage( "Img/red_button.png", 0.12 );
	btnLeft.SetOnTouch( btnLeft_OnTouch );
	btnLeft.SetPosition( 0, 0.7 );
	layCtrl.AddChild( btnLeft );
	
	//Create a left move button.
	btnRight = app.CreateImage( "Img/red_button.png", 0.12 );
	btnRight.SetOnTouch( btnRight_OnTouch );
	btnRight.SetPosition( 0.88, 0.7 );
	layCtrl.AddChild( btnRight );

    //Create and run a local web server.
    //(This is so the game's ajax calls work)
	serv = app.CreateWebServer( 8080 );
	serv.SetFolder( app.GetAppPath() );
	serv.Start();
	
	//Create a web control.
	web = app.CreateWebView( 1, 1, "IgnoreErrors" );
	web.SetBackColor( "#666666" );
	web.SetOnProgress( web_OnProgess );
	lay.AddChild( web );
	
	//Add layouts to app.	
	app.AddLayout( lay );
	app.AddLayout( layCtrl );
	
	//Load the game using our local web server.
	web.LoadUrl( "http://localhost:8080/index.html" );	
}

//Handle page load progress.
function web_OnProgess( progress )
{
	if( progress==100 ) 
	{
	    //Fire missile constantly.
	    setInterval( Fire, 1000 );
	}
}

//Handle left button presses.
function btnLeft_OnTouch( ev )
{
    if( ev.action=="Down" ) web.Execute( "KeyEvent('keydown',37);" ); 
    else if( ev.action=="Up" ) web.Execute( "KeyEvent('keyup',37);" );  
}

//Handle right button presses.
function btnRight_OnTouch( ev )
{
    if( ev.action=="Down" ) web.Execute( "KeyEvent('keydown',39);" ); 
    else if( ev.action=="Up" ) web.Execute( "KeyEvent('keyup',39);" );  
}

//Send the space key to fire a missile.
function Fire()
{
    web.Execute( "KeyPress(32);" ); 
}