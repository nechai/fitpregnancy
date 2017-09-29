jQuery(document).ready(function($) {
  
  // grouping first three block in header
  $('.region-header #block-fitpreg-social-menu, .region-header #block-fitpreg-logo, .region-header #block-fitpreg-login-menu')
    .wrapAll('<div class="firstline-blocks-wrapper"></div>');
    
  // grouping second three block in header
  $('.region-header #block-fitpreg-left-menu, .region-header #block-fitpreg-main-menu, .region-header #block-fitpreg-searchform')
    .wrapAll('<div class="secondline-blocks-wrapper"></div>');
    
  // insert hamburger block in left menu of the header
  $(
    '<div class="left-menu-hamburger">\n\
      <a href="#" class="btn">\n\
        <span class="line"></span>\n\
        <span class="line"></span>\n\
        <span class="line"></span>\n\
      </a>\n\
    </div>'
  ).insertBefore('#block-fitpreg-left-menu .menu');
  
  //grouping blocks in left menu
  $('#block-fitpreg-left-menu .menu, #block-fitpreg-left-menu .social-links-in-menu').wrapAll(
     '<div class="left-menu-wrapper"></div>'
  );
  
  // insert block with search icon in search form of the header
  $(
    '<div class="search-icon">\n\
      <i class="fa fa-search" aria-hidden="true"></i>\n\
    </div>'
  ).insertBefore('#block-fitpreg-searchform form');
  
  $('.block-views-blocksafe-healthy-pregnancy-guide-block-1 .views-field-title, .block-views-blocksafe-healthy-pregnancy-guide-block-1 .views-field-body, .block-views-blocksafe-healthy-pregnancy-guide-block-1 .views-field-view-node')
    .wrapAll("<div class='fields-wrapper'>");
  
  $('.block-views-blockbaby-care-block-1 .views-field-title, .block-views-blockbaby-care-block-1 .views-field-body, .block-views-blockbaby-care-block-1 .views-field-view-node')
    .wrapAll("<div class='fields-wrapper'>");
});