//So here is Jorge Ramirez sample adapted.
//Not perfect, but a good proof of concept to put you on tracks :)

var isAutoComp = false;

//Called when application is started.
function OnStart()
{
    app.SetOrientation( "Portrait" );
    
    //Create a layout with objects aligned to the bottom of the screen.
    lay = app.CreateLayout( "Linear", "Bottom,FillXY" );
 
    //Create a text edit, set a function to trigger on
    //change, and add it to layout.
    txt = app.CreateTextEdit( "Country", 1, 1, "Multiline" );
    txt.SetTextSize( 32 );
    txt.SetOnChange( txt_OnChange );
    lay.AddChild( txt );
 
    //Create a layout that we will display on the right side of the screen.
    layProps = app.CreateLayout( "Linear", "Right,TouchThrough" ); 
    layProps.SetSize( 1, 1 );
    layProps.Hide();
 
    //create an empty list and set a function to trigger
    //when an item is touched
    lst = app.CreateList( "", 0.35, 1 );
    lst.SetOnTouch( lst_OnTouch );
    lst.SetBackColor( "#200000FF" );
    lst.SetEllipsize( "end" );
    layProps.AddChild( lst );
 
    //Add layout to app. 
    app.AddLayout( lay );
    app.AddLayout( layProps );
}

//Triggered everytime the text edit
function txt_OnChange()
{
    var text = txt.GetText();
    
    //Gets the last typed char.
    var char = txt.GetText().slice( -1 );
    
    //Should we start auto completion?
    if( char == "<" ) 
    {
        isAutoComp = true;
        
        if( !layProps.IsVisible() )
            layProps.Animate( "SlideFromRight" );
    }
    //Should we stop auto completion?
    else if( char == ">" || char == "\n" ) 
    {
        isAutoComp = false;
        
        if( layProps.IsVisible() )
            layProps.Animate( "SlideToRight" );
    }
    
    //Are we auto completing?
    if( isAutoComp )
    {
        //Get the text to search for
        var start  = text.lastIndexOf( "<" );
        var search = text.slice( start + 1 );
            
        //only act after the first character
        if( search.length > 0 )
        {
            var results = matchTags( search );
                
            //here I set the list with the result of calling the 
            //matchTags function with the text on txt
            lst.SetList( results, "," ); 
        }
        else
        {
            //Full list of tags
            lst.SetList( tags );
        }
    }
}

//When an user touch an item on the list 
function lst_OnTouch( item )
{
    var text = txt.GetText();
    var tag = item + '></' + item + '>';
    
    //I write the touched item to the textedit
    txt.SetText( text + tag );
    
    //Update cursor position
    var pos = txt.GetCursorPos();
    var newPos = pos + item.length + 1;
    txt.SetCursorPos( newPos );
    
    //I clear the list
    lst.SetList("");
    
    //Hide the list
    isAutoComp = false;
    layProps.Animate( "SlideToRight" );
}

//this is the function that I got on http://www.dustindiaz.com/autocomplete-fuzzy-matching
function matchTags( input ) 
{
    var reg = new RegExp( input.split( '' ).join( '\\w*' ).replace( /\W/, "" ), 'i' );
    return tags.filter( function( tag ) {
        if( tag.match( reg ) ) {
            return tag;
        }
    } );
}

//This is just the list of tags that it will filter
var tags = [
    "a",
    "b",
    "blockquote",
    "div",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "hr",
    "i",
    "img",
    "li",
    "p",
    "ul"
];