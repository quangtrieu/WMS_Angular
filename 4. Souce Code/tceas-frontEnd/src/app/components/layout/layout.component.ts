
import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from "../../app.service";
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

/**
 * App Component
 * Top Level Component
 */

@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    id: 'app'
  },
  providers: [TranslateService]
})

export class LayoutComponent implements OnInit, AfterViewInit {
  router: Router;
  constructor(public appState: AppState, router: Router, private translate: TranslateService) {
    this.router = router;
    translate.addLangs(["en", "vie"]);
    translate.setDefaultLang('en');
    let browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|vie/) ? browserLang : 'en');
  }

  public ngOnInit() {
    console.log('Initial App State in layout', this.appState.state);

  }

  langEnglish() {
    console.log('eng')
    this.translate.use('en');
    $("#my_image").attr("src", "assets/img/flags/english.png");
    $("#lang").text("English");
    $('#eng').addClass('active');
    $('#vie').removeClass('active');
  }

  langVietNamese() {
    console.log('VietNamese')
    this.translate.use('vie');
    $("#my_image").attr("src", "assets/img/flags/vn.png");
    $("#lang").text("VietNamese");
    $('#eng').removeClass('active');
    $('#vie').addClass('active');
  }


  ngAfterViewInit(): void {
    $(function () {
      $.extend($.fn.dataTable.defaults, {
        autoWidth: false,
        pagingType: 'full_numbers',
        dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
        language: {
          search: '<span>Filter:</span> _INPUT_',
          lengthMenu: '<span>Show:</span> _MENU_',
          paginate: { 'first': 'First', 'last': 'Last', 'next': '>', 'previous': '<' }
        }
      });



      //   $('.page-content').wrapInner('<div class="page-content-inner"></div>');

      //   $(document).on('click', '.offcanvas', function () {
      //     $('body').toggleClass('offcanvas-active');
      //   });

      //   $('.navigation').find('li.active').parents('li').addClass('active');
      //   $('.navigation').find('li').not('.active').has('ul').children('ul').addClass('hidden-ul');
      //   $('.navigation').find('li').has('ul').children('a').parent('li').addClass('has-ul');


      //   $(document).on('click', '.sidebar-toggle', function (e) {
      //     e.preventDefault();

      //     $('body').toggleClass('sidebar-narrow');

      //     if ($('body').hasClass('sidebar-narrow')) {
      //       $('.navigation').children('li').children('ul').css('display', '');
      //     }

      //     else {
      //       $('.navigation').children('li').children('ul').css('display', 'none');
      //       $('.navigation').children('li.active').children('ul').css('display', 'block');
      //     }
      //   });

      //   $('.navigation').find('li').has('ul').children('a').on('click', function (e) {
      //     e.preventDefault();

      //     if ($('body').hasClass('sidebar-narrow')) {
      //       $(this).parent('li > ul li').not('.disabled').toggleClass('active').children('ul').slideToggle(250);
      //       $(this).parent('li > ul li').not('.disabled').siblings().removeClass('active').children('ul').slideUp(250);
      //     }

      //     else {
      //       $(this).parent('li').not('.disabled').toggleClass('active').children('ul').slideToggle(250);
      //       $(this).parent('li').not('.disabled').siblings().removeClass('active').children('ul').slideUp(250);
      //     }
      //   });

      //   $('[data-panel=collapse]').click(function (e) {
      //     e.preventDefault();
      //     var $target = $(this).parent().parent().next('div');
      //     if ($target.is(':visible')) {
      //       $(this).children('i').removeClass('icon-arrow-up9');
      //       $(this).children('i').addClass('icon-arrow-down9');
      //     }
      //     else {
      //       $(this).children('i').removeClass('icon-arrow-down9');
      //       $(this).children('i').addClass('icon-arrow-up9');
      //     }
      //     $target.slideToggle(200);
      //   });

      //   $('[data-panel=close]').click(function (e) {
      //     e.preventDefault();
      //     var $panelContent = $(this).parent().parent().parent();
      //     $panelContent.slideUp(200).remove("200");
      //   });

      //   $('.run-first').click(function () {
      //     $('body').append('<div class="overlay"><div class="opacity"></div><i class="icon-spinner2 spin"></i></div>');
      //     $('.overlay').fadeIn(150);
      //     window.setTimeout(function () {
      //       $('.overlay').fadeOut(150, function () {
      //         $(this).remove();
      //       });
      //     }, 5000);
      //   });

      //   $('.run-second').click(function () {
      //     $('body').append('<div class="overlay"><div class="opacity"></div><i class="icon-spinner3 spin"></i></div>');
      //     $('.overlay').fadeIn(150);
      //     window.setTimeout(function () {
      //       $('.overlay').fadeOut(150, function () {
      //         $(this).remove();
      //       });
      //     }, 5000);
      //   });

      //   $('.run-third').click(function () {
      //     $('body').append('<div class="overlay"><div class="opacity"></div><i class="icon-spinner7 spin"></i></div>');
      //     $('.overlay').fadeIn(150);
      //     window.setTimeout(function () {
      //       $('.overlay').fadeOut(150, function () {
      //         $(this).remove();
      //       });
      //     }, 5000);
      //   });

      //   $('.navigation .disabled a, .navbar-nav > .disabled > a').click(function (e) {
      //     e.preventDefault();
      //   });

      //   $('.panel-trigger').click(function (e) {
      //     e.preventDefault();
      //     $(this).toggleClass('active');
      //   });
    });
  }
}
