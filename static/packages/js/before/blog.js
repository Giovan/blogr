
// https://stackoverflow.com/a/39914235/7891095
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


(function() {
    'use strict';
    window.addEventListener('load', function() {
        var form = document.getElementById('needs-validation');
        if(form) {
            form.addEventListener('submit', function(event) {
                $(".form-control:valid + .invalid-feedback").css("display", "none");
                $(".form-control:invalid + .invalid-feedback").css("display", "block");
                
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    $("button[type=submit]").attr("disabled", "disabled");
                    // var pwd1 = document.getElementById("passwordField");
                    // var pwd2 = document.getElementById("passwordHidden");
                    // if (pwd1 && pwd2) {
                        // pwd1.style.display = 'none';
                        // pwd2.style.display = 'block';
                        // pwd1.value = Sha256.hash(pwd1.value);
                    // }
                }
                form.classList.add('was-validated');
            }, false);
        }
        // form.addEventListener('submit', function(event) {
        //     insta_valid();
        // }, false);
    }, false);
})();
// function insta_valid() {
//     var form = document.getElementById("validate-me");
// }
// function insta_valid() {
//     $(".form-control:valid + .invalid-feedback").css("display", "none");
//     $(".form-control:invalid + .invalid-feedback").css("display", "block");
// }


// $(".").

// https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
// https://stackoverflow.com/a/25621277/7891095
function ChangeHeight() {
    var original = this.style.height;
    this.style.height = 'auto';
    if(original != this.scrollHeight) {
        this.style.height = (this.scrollHeight) + 'px';
    } // else {
        // REMOVE THIS
        // console.log("Not updating height");
    //}
}

function StartText() {
    var txt = document.getElementsByTagName('textarea');
    for (var i = 0; i < txt.length; i++) {
        txt[i].setAttribute('style', 'height:' + (txt[i].scrollHeight) + 'px;overflow-y:hidden;');
        txt[i].addEventListener("input", ChangeHeight, false);
    }
}

// document.getElementById("insert-tags").onchange = "";

function checkTags() {
    // var tagform = document.getElementById();
    var tagform = document.forms.insert_form.elements["tags"];
    var tagmsg = document.getElementById("tag-msg");
    if (tagform.value.indexOf(' ') != -1 && tagform.value.indexOf(',') == -1) {
        tagmsg.style.display = "block";
    } else {
        tagmsg.style.display = "none";
    }
    
}

function show_contact() {
    // Email obfuscator script 2.1 by Tim Williams, University of Arizona
    // Random encryption key feature coded by Andrew Moulden
    // This code is freeware provided these four comment lines remain intact
    // A wizard to generate this code is at http://www.jottings.com/obfuscator/
    { coded = "uqyNFia.zNFqaJ@IWzyi.xtW"
      key = "WKfChFt7lv4Ykz9nGrTJBIZXUPHeLs2ciAp6SDmNQq3doMR1E50a8OVxywugbj"
      shift=coded.length
      link=""
      for (i=0; i<coded.length; i++) {
        if (key.indexOf(coded.charAt(i))==-1) {
          ltr = coded.charAt(i)
          link += (ltr)
        }
        else {
          ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length
          link += (key.charAt(ltr))
        }
      }
    // document.write("<a href='mailto:"+link+"'>Andrew Prindle</a>")
    document.write("<a href='mailto:"+link+"'><i class=\"v-icon-at fa fa-at\" aria-hidden=\"true\"></i> Andrew Prindle</a>")
    }
}


function set_login_focus() {
    var user = document.getElementById('usernameField');
    var pass = document.getElementById('passwordField');
    if (user && user.value) {
        pass.focus();
    } else {
        user.focus();
    }
    
}

function confirm_action(text) {
    var agree = confirm(text);
    if (agree) {
        return true;
    } else {
        return false;
    }
}


// http://shebang.brandonmintern.com/foolproof-html-escaping-in-javascript/
function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    
    // return div.innerHTML;
    
    var output = div.innerHTML;
    div = undefined;
    return output;
}


function preview_edit() {
    // console.log("article - editing");
    var preview_form = document.getElementById('v-edit-preview');
    var edit_form = document.getElementById('v-edit');
    // var edit_form = document.getElementById('insert_form');
    
    if (edit_form && preview_form) {
        var title = document.getElementById('inputTitle');
        var desc = document.getElementById('insert_desc');
        var body = document.getElementById('insert_body');
        var tags = document.getElementById('insert-tags');
        var img = document.getElementById('article-image');
        var header = document.getElementById('header-article');
        var imgs = document.getElementById('article-image-select');
        var prev_title = document.getElementById('prev-title');
        var prev_desc = document.getElementById('prev-desc');
        var prev_body = document.getElementById('prev-body');
        var prev_tags = document.getElementById('prev-tags');
        
        if (!title || !desc || !body || !tags || !prev_title || !prev_desc || !prev_body || !prev_tags) {
            console.log("One of the fields was blank.");
            return;
        }
        
        var base_url = document.getElementById('base_url').value;
        
        
        if(img && header) {
            imgsrc = img.value.trim();
            if (imgsrc != "") {
                header.style.background = "url('" + base_url + "imgs/" + imgsrc + "') center center no-repeat";
            }
        } else if(imgs && header) {
            // if image field is a dropdown select box
            // console.log("Select image");
            var imgsrc = imgs.value.trim();
            if (imgsrc != "") {
                // console.log("setting background");
                header.style.background = "url('" + base_url + "imgs/" + imgsrc + "') center center no-repeat";
            }
        }
        
        
        var tags_html = "";
        var tags_array = tags.value.split(',');
        if (tags_array && tags_array.length > 0) {
            for(var i=0; i < tags_array.length; i++) {
                var cur_tag = escapeHtml(tags_array[i]);
                tags_html += " <a href=\"" + base_url + "tag?tag=" + cur_tag + "\">#" + cur_tag + "</a> ";
            }
        }
        
        prev_title.innerHTML = title.value;
        prev_desc.innerHTML = desc.value;
        prev_body.innerHTML = body.value;
        prev_tags.innerHTML = tags_html;
        
        edit_form.style.display = 'none';
        preview_form.style.display = 'block';
        
        if (rm) {
            var html = process_markdown();
            preview_markdown(html);
            submit_markdown(html);
        }
    }
}

function preview_create() {
    var preview_form = document.getElementById('v-edit-preview');
    var edit_form = document.getElementById('v-edit');
    // var edit_form = document.getElementById('insert_form');
    // console.log("article - creating");
    if (edit_form && preview_form) {
        var title = document.getElementById('inputTitle');
        var desc = document.getElementById('insert_desc');
        var body = document.getElementById('insert_body');
        var tags = document.getElementById('insert-tags');
        var img = document.getElementById('article-image');
        var header = document.getElementById('header-article');
        var imgs = document.getElementById('article-image-select');
        var prev_title = document.getElementById('prev-title');
        var prev_desc = document.getElementById('prev-desc');
        var prev_body = document.getElementById('prev-body');
        var prev_tags = document.getElementById('prev-tags');
        
        
        if (!title || !desc || !body || !tags || !prev_title || !prev_desc || !prev_body || !prev_tags) {
            console.log("One of the fields was blank.");
            return;
        }
        
        var base_url = document.getElementById('base_url').value;
        
        
        if(img && header) {
            // if image field is a text input box
            var imgsrc = img.value.trim();
            if (imgsrc != "") {
                header.style.background = "url('" + base_url + "imgs/" + imgsrc + "') center center no-repeat";
            }
        } else if(imgs && header) {
            // if image field is a dropdown select box
            // console.log("Select image");
            var imgsrc = imgs.value.trim();
            if (imgsrc != "") {
                // console.log("setting background");
                header.style.background = "url('" + base_url + "imgs/" + imgsrc + "') center center no-repeat";
            }
        }
        
        
        var tags_html = "";
        var tags_array = tags.value.split(',');
        if (tags_array && tags_array.length > 0) {
            for(var i=0; i < tags_array.length; i++) {
                var cur_tag = escapeHtml(tags_array[i]);
                tags_html += " <a href=\"" + base_url + "tag?tag=" + cur_tag + "\">#" + cur_tag + "</a> ";
            }
        }
        
        prev_title.innerHTML = title.value;
        prev_desc.innerHTML = desc.value;
        prev_body.innerHTML = body.value;
        prev_tags.innerHTML = tags_html;
        
        edit_form.style.display = 'none';
        preview_form.style.display = 'block';
        
        if (rm) {
            var html = process_markdown();
            preview_markdown(html);
            submit_markdown(html);
        }
    }
}

function preview_edit_end() {
    var preview_form = document.getElementById('v-edit-preview');
    var edit_form = document.getElementById('v-edit');
    if (preview_form && edit_form) {
        preview_form.style.display = 'none';
        edit_form.style.display = 'block';
    }
}

function save_html() {
    if (rm) {
        var html = process_markdown();
        submit_markdown(html);
    }
}

// var vTextChanged = false;
// 
// function vTextKeyPress() {
//     vTextChanged = true;
// }
// 
// async function start_timer() {
//     vTextChanged = false;
//     await sleep(2000);
//     if (vTextChanged) {
//         
//     }
//     
// }

// Process the body text into markdown
function process_markdown() {
    var body = document.getElementById('insert_body');
    
    var html = rm.render(body.value);
    
    return html;
}

// Put the markdown rendered output into the preview body's innerHTML
function preview_markdown(html) {
    if (!rm) { return; }
    
    var preview_form = document.getElementById('v-edit-preview');
    var edit_form = document.getElementById('v-edit');
    // var edit_form = document.getElementById('insert_form');
    
    if (edit_form && preview_form) {
        var body = document.getElementById('prev-body');
        body.innerHTML = html;
    }
}

// add markdown to a hidden markdown input field
function submit_markdown(html) {
    if (!rm) { return; }
    
    var preview_form = document.getElementById('v-edit-preview');
    var edit_form = document.getElementById('v-edit');
    // var edit_form = document.getElementById('insert_form');
    var bodymd = document.getElementById('mdhtml');
    
    if (edit_form && preview_form && bodymd) {
        // var body = document.getElementById('insert_body');
        bodymd.value = html;
    }
}

// https://github.com/ndabas/toc
// https://ndabas.github.io/toc/
function enable_toc(is_article=false) {
    var is_disabled = document.getElementById("disable-toc");
    if(is_disabled) { return; }
    // console.log("TOC enabled");
    $(document).ready(function() {
        // console.log("Running toc");
        $('#toc').toc({
            // body: ".v-content",
            // body: tocarg,
            // content: "article", 
            // content: ".v-toc-body", 
            // selector
            
            headings: "h1,h2,h3,h4,h5,h6",
            elementClass: 'toc',
            ulClass: 'nav',
            heading: 'Table of Contents'
        });
        fix_toc(is_article);
        top_links();
    });
}

function fix_toc(is_article) {
    $("ul.toc-ul-root li").each(function() {
        var txt = $(this).text();
        // if($(this).text() == "Admin Menu") {
        if(txt == "Admin Menu" || txt == "User Menu") {
            // console.log("Removing entry");
            $(this).remove();
        }
    });
    if (is_article) {
        $("ul.toc-ul-root li:nth-child(2)").remove();
    }
    if($("ul.toc-ul-root li").length <= 1) {
        $("#toc.toc").remove();
    }
}

function top_links() {
    // $("h1,h2").not(".v-article-title").after("<div class='a-top-div'><a class='a-top' href='#top'>Top</a></div>");
    $("h1,h2,h3,h4").not(".v-article-title").after("<div class='a-top-div'><a class='a-top' href='#top'>Top</a></div>");
}

// http://jsfiddle.net/SLQpM/23/
// https://stackoverflow.com/a/14788286
function clearSelection() {
    var sel;
    if ( (sel = document.selection) && sel.empty ) {
        sel.empty();
    } else {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        }
        var activeEl = document.activeElement;
        if (activeEl) {
            var tagName = activeEl.nodeName.toLowerCase();
            if ( tagName == "textarea" || (tagName == "input" && activeEl.type == "text") ) {
                // Collapse the selection to the end
                activeEl.selectionStart = activeEl.selectionEnd;
            }
        }
    }
}

// https://github.com/kamranahmedse/jquery-toast-plugin
// http://kamranahmed.info/toast
function show_toast(msg="Text copied to clipboard.", timeout=4000, bgcol="#444444", txtcol="#eeeeee", pos="bottom-right", txtalign="left", ) {
    $.toast({
        text: msg, // Text that is to be shown in the toast
        // text: "Text copied to clipboard.", // Text that is to be shown in the toast
        showHideTransition: 'plain', // fade, slide or plain
        allowToastClose: true, // Boolean value true or false
        hideAfter: timeout, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
        stack: 4, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
        position: pos, // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
        
        bgColor: bgcol,  // Background color of the toast
        textColor: txtcol,  // Text color of the toast
        textAlign: txtalign,  // Text alignment i.e. left, right or center
        loader: false,  // Whether to show loader or not. True by default
        loaderBg: '#9EC600',  // Background color of the toast loader
        beforeShow: function () {}, // will be triggered before the toast is shown
        afterShown: function () {}, // will be triggered after the toat has been shown
        beforeHide: function () {}, // will be triggered before the toast gets hidden
        afterHidden: function () {}  // will be triggered after the toast has been hidden
    });
}

var vMobile = false;
$( document ).ready(function() {      
    var isMobile = window.matchMedia("only screen and (max-width: 760px)");
    
    if (isMobile.matches) {
        vMobile = true;
        $("a[data-fancybox]").click(function() {
            show_toast(msg="Swipe up or down to close", timeout=1000);
        })
    }
});
 // show_toast("Swipe up or down to close image");


