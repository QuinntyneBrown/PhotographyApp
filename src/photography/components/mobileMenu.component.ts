module App.Photography {
    
    export class MobileMenuComponent {
        
    }

    Component({
        module:"app.photography",
        selector: "mobile-menu",
        component: MobileMenuComponent,
        template: ["<div class='mobile-menu'>",
            "<div>",
            "<a>Home</a>",
            "<a>Photos</a>",
            "<a>Rates</a>",
            "</div>",
            "</div>"
        ].join(" ")
    });
} 