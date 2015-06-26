  //globals
  
    var GInternetProtSettingsDialogWidth = 810;  
    var GInternetProtSettingsDialogHeight = 640;
    var GInternetProtSettingsTabControlWidth = GInternetProtSettingsDialogWidth - 50;
    var GInternetProtSettingsTabControlHeight = GInternetProtSettingsDialogHeight - 150;
    var GInternetProtSettingsTabs = null; 
    var GCurrentInternetProtocolSetRegistryList = null; 
    var GSelectedProfileName = "";
    var GLeftOrRight = "";
    var GProtocolName = "";

    var InternetProtSettingsTabsHTML_Cloud = 
    '<div id="jqxInternetProtSettingsTabs">'+
                '<ul>'+
                '    <li>Settings</li>'+
                '    <li>Advanced</li>'+
                '    <li>Proxy Settings</li>'+          
                '</ul>'+
                '<div>'+                                                                                                      
                '    <div>Library</div><div id ="jqxLibraryCombo" style="float: left;"></div>'+
                '    <br/><br/>'+
                '    <div>Folder</div><div><input type="text" id="inptInternetFolder"/></div>'+
                '    <br/><br/>'+
                '    <div>Account( opt. )</div><div><input type="password" id="inptAccountOpt"/></div>'+
                '    <br/><br/>'+                                          
                '</div>'+                  
                '<div>'+
                '</div>'+
                '<div>'+                                                           
                '</div>'+
             '</div>';



function OnProtocolComboItem( ProfileName, InternetProtocolSetRegistryList, LeftOrRight, ProtocolName )
{

      
     if( GInternetProtSettingsTabs != null)  
      {
         GInternetProtSettingsTabs.jqxTabs( 'destroy' ); 
         GInternetProtSettingsTabs = null;
      }  
           
      /*
      ftpGUIlikeFTP          =1;
      ftpGUIlikeSFTP         =2;
      ftpGUIlikeWebDAV       =3;
      ftpGUIlikeAmazonS3     =4;
      ftpGUIlikeAzure        =5;
      ftpGUIlikeAmazonGlacier=6;
      ftpGUIlikeGoogleDrive  =7;
      ftpGUIlikeRSync        =8;
      ftpGUIlikeHTTP         =9;
      ftpGUIlikeMTP          =10;
      */ 
      if( ProtocolName == 'FTP' || ProtocolName == 'SSH')
      {

          $("#jqxInternetProtSettingsTabs_div").html( InternetProtSettingsTabsHTML_FTP );  
          GInternetProtSettingsTabs = $('#jqxInternetProtSettingsTabs').jqxTabs({ width: GInternetProtSettingsTabControlWidth, height: GInternetProtSettingsTabControlHeight });   
          var LibraryComboSource = ['1(default)', '2', '3' ];
          $("#jqxLibraryCombo").jqxComboBox({ source: LibraryComboSource, selectedIndex: 0, width: '100', height: '25px'});

          $("#inptIntProtSetFTP_url").jqxInput({ width: 350, height: 25 });
          $("#inptIntProtSet_FTP_port").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false }); 
          $("#cbIntProtSet_FTP_passive_mode").jqxCheckBox({ width: 120, height: 25});                     
          $("#inptInternetFolder").jqxInput({ width: 350, height: 25 });
          $("#inptIntProtSet_FTP_login").jqxInput({ width: 350, height: 25 });          
          $("#inptAccountOpt").jqxPasswordInput({ width: 350, height: 25 });
          $("#cbIntProtSet_FTP_save_user_id").jqxCheckBox({ width: 120, height: 25});                     
          $("#cbIntProtSet_FTP_save_password").jqxCheckBox({ width: 120, height: 25});                     
          $("#cbIntProtSet_FTP_allow_ipv6").jqxCheckBox({ width: 120, height: 25});                     
          $("#cbIntProtSet_FTP_auto_resume_transfer").jqxCheckBox({ width: 120, height: 25});                     
          $("#cbIntProtSet_FTP_filename_encoding").jqxCheckBox({ width: 120, height: 25});                     
                              
          var adv_CharsetComboSource = ['Automatic', 'Unicode(UTF-8)', 'Windows ANSI' ];
          
          $("#comboIntProtSet_FTP_adv_Charset").jqxComboBox({ source: adv_CharsetComboSource, selectedIndex: 0, width: '250', height: '25px'});
          $("#cbIntProtSet_FTP_adv_replace_characters").jqxCheckBox({ width: 120, height: 25});                     
          $("#cbIntProtSet_FTP_adv_ascii_transfer_mode").jqxCheckBox({ width: 120, height: 25});                     
          $("#cbIntProtSet_FTP_adv_server_supports_moving").jqxCheckBox({ width: 120, height: 25});                     
 
          var adv_FTP_ListingCommandComboSource = ['Automatic', 'LIST(basic listing)', 'LIST-al(includes hidden files)', 'LIST-alR(recursive listing)', 'LS-al(rare)', 'LS-alR(rare)' ];
          $("#comboIntProtSet_FTP_adv_ListingCommand").jqxComboBox({ source: adv_FTP_ListingCommandComboSource, selectedIndex: 0, width: '250', height: '25px'});
          $("#cbIntProtSet_FTP_adv_verify_file").jqxCheckBox({ width: 120, height: 25});                     
          $("#cbIntProtSet_FTP_adv_respect_passive_mode").jqxCheckBox({ width: 120, height: 25});                     
          var adv_FTP_TimestampsForUploadsComboSource = ['Auto-Detect If Settable', 'Force Sending Timestamps'];
          $("#comboIntProtSet_FTP_adv_TimestampsForUploads").jqxComboBox({ source: adv_FTP_TimestampsForUploadsComboSource, selectedIndex: 0, width: '250', height: '25px'});
          $("#cbIntProtSet_FTP_adv_zone").jqxCheckBox({ width: 120, height: 25});
          $("#cbIntProtSet_FTP_adv_auto").jqxCheckBox({ width: 120, height: 25});
          $("#cbIntProtSet_FTP_adv_UTC").jqxCheckBox({ width: 120, height: 25});
          $("#inptIntProtSet_FTP_adv_list").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false }); 
          $("#inptIntProtSet_FTP_adv_upload_min").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false }); 
          $("#inptIntProtSet_FTP_adv_timeout").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false }); 
          $("#inptIntProtSet_FTP_adv_retries").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false }); 
          $("#inptIntProtSet_FTP_adv_http_retries").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false });   

          var FTP_proxy_proxy_typeComboSource = ['No Proxy(default)', 'USER user@hostname', 'SITE(with logon)', 'OPEN', 'USER/PASS combined', 'Transparent'];
          $("#comboIntProtSet_FTP_proxy_proxy_type").jqxComboBox({ source: FTP_proxy_proxy_typeComboSource, selectedIndex: 0, width: '250', height: '25px'});
          $("#inptIntProtSet_FTP_proxy_proxy_host").jqxInput({ width: 350, height: 25 });
          $("#inptIntProtSet_FTP_proxy_proxy_port").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false }); 

          $("#inptIntProtSet_FTP_proxy_login").jqxInput({ width: 350, height: 25 });          
          $("#inptIntProtSet_FTP_proxy_password").jqxPasswordInput({ width: 350, height: 25 });
          $("#cbIntProtSet_FTP_proxy_send_host_command").jqxCheckBox({ width: 120, height: 25});    

          $("#rbIntProtSet_FTP_Security_security_none").jqxRadioButton({ groupName: 'IntProtSet_FTP_Security_Mode_Group', rtl: false});                 
          $("#rbIntProtSet_FTP_Security_security_implisit_tsl").jqxRadioButton({ groupName: 'IntProtSet_FTP_Security_Mode_Group', rtl: false});                 
          $("#rbIntProtSet_FTP_Security_security_explisit_tsl").jqxRadioButton({ groupName: 'IntProtSet_FTP_Security_Mode_Group', rtl: false});                 

          $("#rbIntProtSet_FTP_Security_auto").jqxRadioButton({ groupName: 'IntProtSet_FTP_Auth_Cmd_Group', rtl: false});                 
          $("#rbIntProtSet_FTP_Security_TLS").jqxRadioButton({ groupName: 'IntProtSet_FTP_Auth_Cmd_Group', rtl: false});                 
          $("#rbIntProtSet_FTP_Security_SSL").jqxRadioButton({ groupName: 'IntProtSet_FTP_Auth_Cmd_Group', rtl: false});                 
          $("#rbIntProtSet_FTP_Security_TLSC").jqxRadioButton({ groupName: 'IntProtSet_FTP_Auth_Cmd_Group', rtl: false});                     
          $("#rbIntProtSet_FTP_Security_TLSP").jqxRadioButton({ groupName: 'IntProtSet_FTP_Auth_Cmd_Group', rtl: false});                     


          $("#rbIntProtSet_FTP_Security_SSLv2").jqxRadioButton({ groupName: 'IntProtSet_FTP_Version_Group', rtl: false});                     
          $("#rbIntProtSet_FTP_Security_SSLv2_3").jqxRadioButton({ groupName: 'IntProtSet_FTP_Version_Group', rtl: false}); 
          $("#rbIntProtSet_FTP_Security_SSLv3").jqxRadioButton({ groupName: 'IntProtSet_FTP_Version_Group', rtl: false}); 
          $("#rbIntProtSet_FTP_Security_TLSv_1_1_2").jqxRadioButton({ groupName: 'IntProtSet_FTP_Version_Group', rtl: false}); 

          $("#btnIntProtSet_FTP_Security_Advanced_SSH").jqxButton({ template: "info" }); 

          $("#cbIntProtSet_FTP_Security_SSH_username_password").jqxCheckBox({ width: 120, height: 25});
          $("#cbIntProtSet_FTP_Security_SSH_keyboard").jqxCheckBox({ width: 120, height: 25});
          $("#cbIntProtSet_FTP_Security_SSH_certificate").jqxCheckBox({ width: 120, height: 25});


          var FTP_proxy_security_CertificateComboSource = ['none'];
          $("#comboIntProtSet_FTP_security_Certificate").jqxComboBox({ source: FTP_proxy_security_CertificateComboSource, selectedIndex: 0, width: '250', height: '25px'});
          $("#inptIntProtSet_FTP_security_CertificatePassword").jqxPasswordInput({ width: 350, height: 25 }); 
          $("#cbIntProtSet_FTP_security_nopassword").jqxCheckBox({ width: 120, height: 25});


          $("#inptIntProtSet_FTP_certificates_certificates").jqxInput({ width: 350, height: 150 });
          $("#inptIntProtSet_FTP_certificates_certname_forreference").jqxInput({ width: 350, height: 25 });
          $("#inptIntProtSet_FTP_certificates_private_keyfile").jqxInput({ width: 350, height: 25 });
          $("#inptIntProtSet_FTP_certificates_public_keyfile").jqxInput({ width: 350, height: 25 });
      }
      else if( ProtocolName == 'HTTP' )
      {
          $("#jqxInternetProtSettingsTabs_div").html( InternetProtSettingsTabsHTML_HTTP );  
          GInternetProtSettingsTabs = $('#jqxInternetProtSettingsTabs').jqxTabs({ width: GInternetProtSettingsTabControlWidth, height: GInternetProtSettingsTabControlHeight });   

          $("#inptIntProtSet_HTTP_url").jqxInput({ width: 350, height: 25 });
          $("#inptIntProtSet_HTTP_port").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false });                                
          $("#inptInternetFolder").jqxInput({ width: 350, height: 25 });
          $("#inptIntProtSet_HTTP_login").jqxInput({ width: 350, height: 25 });          
          $("#inptAccountOpt").jqxPasswordInput({ width: 350, height: 25 });
          $("#cbIntProtSet_HTTP_save_user_id").jqxCheckBox({ width: 120, height: 25});                     
          $("#cbIntProtSet_HTTP_save_password").jqxCheckBox({ width: 120, height: 25});                     
          $("#cbIntProtSet_HTTP_allow_ipv6").jqxCheckBox({ width: 120, height: 25});                     
          $("#cbIntProtSet_HTTP_filename_encoding").jqxCheckBox({ width: 120, height: 25});    


          $("#cbIntProtSet_HTTP_HTML_download_and_parse").jqxCheckBox({ width: 120, height: 25});
          $("#inptIntProtSet_HTTP_HTML_parsing_limit").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false }); 
          $("#cbIntProtSet_HTTP_HTML_enquire_timestamp").jqxCheckBox({ width: 120, height: 25});
          $("#cbIntProtSet_HTTP_HTML_enquire_precise_info").jqxCheckBox({ width: 120, height: 25});
          $("#cbIntProtSet_HTTP_HTML_download_default_pages").jqxCheckBox({ width: 120, height: 25});   
          $("#cbIntProtSet_HTTP_HTML_consider_locally_existing_files").jqxCheckBox({ width: 120, height: 25});   
          $("#cbIntProtSet_HTTP_HTML_assume_local_files").jqxCheckBox({ width: 120, height: 25});   
          $("#cbIntProtSet_HTTP_HTML_avoid_re_downloading").jqxCheckBox({ width: 120, height: 25});

          var HTTP_HTML_links_ComboSource = ['Ignore', 'Download', 'Download&Analyze']; 
          $("#jqxLinksAboveCombo").jqxComboBox({ source: HTTP_HTML_links_ComboSource, selectedIndex: 0, width: '100', height: '25px'});
          $("#jqxLinksToOtherDomainsCombo").jqxComboBox({ source: HTTP_HTML_links_ComboSource, selectedIndex: 0, width: '100', height: '25px'});
 

          var HTTP_adv_CharsetComboSource = ['Automatic', 'Unicode(UTF-8)', 'Windows ANSI' ];
          
          $("#comboIntProtSet_HTTP_adv_Charset").jqxComboBox({ source: HTTP_adv_CharsetComboSource, selectedIndex: 0, width: '250', height: '25px'});
          $("#cbIntProtSet_HTTP_adv_replace_characters").jqxCheckBox({ width: 120, height: 25});    
          
          $("#cbIntProtSet_HTTP_adv_zone").jqxCheckBox({ width: 120, height: 25});    
          $("#cbIntProtSet_HTTP_adv_auto").jqxCheckBox({ width: 120, height: 25});    
          $("#cbIntProtSet_HTTP_adv_UTC").jqxCheckBox({ width: 120, height: 25});    
          $("#inptIntProtSet_HTTP_adv_list").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false });
          $("#inptIntProtSet_HTTP_adv_upload_min").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false });
                    
          $("#inptIntProtSet_HTTP_adv_timeout").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false });          
          $("#inptIntProtSet_HTTP_adv_retries").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false });          
          $("#inptIntProtSet_HTTP_adv_http_retries").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false });                                         
          
          var FTP_proxy_proxy_typeComboSource = ['No Proxy(default)', 'USER user@hostname', 'SITE(with logon)', 'OPEN', 'USER/PASS combined', 'Transparent'];
          $("#comboIntProtSet_HTTP_proxy_proxy_type").jqxComboBox({ source: FTP_proxy_proxy_typeComboSource, selectedIndex: 0, width: '250', height: '25px'});
          $("#inptIntProtSet_HTTP_proxy_proxy_host").jqxInput({ width: 350, height: 25 });
          $("#inptIntProtSet_HTTP_proxy_proxy_port").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false }); 

          $("#inptIntProtSet_HTTP_proxy_login").jqxInput({ width: 350, height: 25 });          
          $("#inptIntProtSet_HTTP_proxy_password").jqxPasswordInput({ width: 350, height: 25 });
          $("#cbIntProtSet_HTTP_proxy_send_host_command").jqxCheckBox({ width: 120, height: 25});    
 


          $("#rbIntProtSet_HTTP_Security_SSLv2").jqxRadioButton({ groupName: 'IntProtSet_HTTP_Version_Group', rtl: false});                     
          $("#rbIntProtSet_HTTP_Security_SSLv2_3").jqxRadioButton({ groupName: 'IntProtSet_HTTP_Version_Group', rtl: false}); 
          $("#rbIntProtSet_HTTP_Security_SSLv3").jqxRadioButton({ groupName: 'IntProtSet_HTTP_Version_Group', rtl: false}); 
          $("#rbIntProtSet_HTTP_Security_TLSv_1_1_2").jqxRadioButton({ groupName: 'IntProtSet_HTTP_Version_Group', rtl: false}); 

          $("#btnIntProtSet_HTTP_Security_Advanced_SSH").jqxButton({ template: "info" }); 

          $("#cbIntProtSet_HTTP_Security_SSH_username_password").jqxCheckBox({ width: 120, height: 25});
          $("#cbIntProtSet_HTTP_Security_SSH_keyboard").jqxCheckBox({ width: 120, height: 25});
          $("#cbIntProtSet_HTTP_Security_SSH_certificate").jqxCheckBox({ width: 120, height: 25});


          var HTTP_security_CertificateComboSource = ['none'];
          $("#comboIntProtSet_HTTP_security_Certificate").jqxComboBox({ source: HTTP_security_CertificateComboSource, selectedIndex: 0, width: '250', height: '25px'});
          $("#inptIntProtSet_HTTP_security_CertificatePassword").jqxPasswordInput({ width: 350, height: 25 }); 
          $("#cbIntProtSet_HTTP_security_nopassword").jqxCheckBox({ width: 120, height: 25});

          $("#inptIntProtSet_HTTP_certificates_certificates").jqxInput({ width: 350, height: 150 });
          $("#inptIntProtSet_HTTP_certificates_certname_forreference").jqxInput({ width: 350, height: 25 });
          $("#inptIntProtSet_HTTP_certificates_private_keyfile").jqxInput({ width: 350, height: 25 });
          $("#inptIntProtSet_HTTP_certificates_public_keyfile").jqxInput({ width: 350, height: 25 });


      }
      else if( ProtocolName == 'Google Drive' )
      {
          $("#jqxInternetProtSettingsTabs_div").html( InternetProtSettingsTabsHTML_GoogleDrive );  
          
          GInternetProtSettingsTabs = $('#jqxInternetProtSettingsTabs').jqxTabs({ width: GInternetProtSettingsTabControlWidth, height: GInternetProtSettingsTabControlHeight });   
       

        //Library Combo  
          var LibraryComboSource = ['1 MS(SSL)', '2 Open(SSL)'];
          $("#jqxLibraryCombo").jqxComboBox({ source: LibraryComboSource, selectedIndex: 0, width: '100', height: '25px'});
                                

        // Internet Folder
          $("#inptInternetFolder").jqxInput({ width: 350, height: 25 });
          $("#inptAccountOpt").jqxPasswordInput({ width: 350, height: 25 });    
          
          $("#cbIntProtSet_GDrive_save_optional_accname").jqxCheckBox({ width: 120, height: 25});   
          $("#cbIntProtSet_GDrive_allow_ipv6").jqxCheckBox({ width: 120, height: 25});    
          $("#cbIntProtSet_GDrive_auto_resume_transfer").jqxCheckBox({ width: 120, height: 25});                     
          $("#cbIntProtSet_GDrive_filename_encoding").jqxCheckBox({ width: 120, height: 25});   

           var GDrive_adv_CharsetComboSource = ['Automatic', 'Unicode(UTF-8)', 'Windows ANSI' ];
          
          $("#comboIntProtSet_GDrive_adv_Charset").jqxComboBox({ source: GDrive_adv_CharsetComboSource, selectedIndex: 0, width: '250', height: '25px'});
          $("#cbIntProtSet_GDrive_adv_replace_characters").jqxCheckBox({ width: 120, height: 25});    
          $("#cbIntProtSet_GDrive_adv_enable_doc_convercion").jqxCheckBox({ width: 120, height: 25});    

          $("#cbIntProtSet_GDrive_adv_zone").jqxCheckBox({ width: 120, height: 25});    
          $("#cbIntProtSet_GDrive_adv_auto").jqxCheckBox({ width: 120, height: 25});    
          $("#cbIntProtSet_GDrive_adv_UTC").jqxCheckBox({ width: 120, height: 25});    
          $("#inptIntProtSet_GDrive_adv_list").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false });
          $("#inptIntProtSet_GDrive_adv_upload_min").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false });
                    
          $("#inptIntProtSet_GDrive_adv_timeout").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false });          
          $("#inptIntProtSet_GDrive_adv_retries").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false });          
          $("#inptIntProtSet_GDrive_adv_http_retries").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false });          
           
          var GDrive_proxy_proxy_typeComboSource = ['No Proxy(default)', 'USER user@hostname', 'SITE(with logon)', 'OPEN', 'USER/PASS combined', 'Transparent'];
          $("#comboIntProtSet_GDrive_proxy_proxy_type").jqxComboBox({ source: GDrive_proxy_proxy_typeComboSource, selectedIndex: 0, width: '250', height: '25px'});
          $("#inptIntProtSet_GDrive_proxy_proxy_host").jqxInput({ width: 350, height: 25 });
          $("#inptIntProtSet_GDrive_proxy_proxy_port").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false }); 

          $("#inptIntProtSet_GDrive_proxy_login").jqxInput({ width: 350, height: 25 });          
          $("#inptIntProtSet_GDrive_proxy_password").jqxPasswordInput({ width: 350, height: 25 });
          $("#cbIntProtSet_GDrive_proxy_send_host_command").jqxCheckBox({ width: 120, height: 25});    
          
                  
          $("#rbIntProtSet_GDrive_GDocs_xlsx").jqxRadioButton({ groupName: 'IntProtSet_GDrive_FormatSpreadsheets_Group', rtl: false});                     
          $("#rbIntProtSet_GDrive_GDocs_csv").jqxRadioButton({ groupName: 'IntProtSet_GDrive_FormatSpreadsheets_Group', rtl: false}); 
          $("#rbIntProtSet_GDrive_GDocs_pdf").jqxRadioButton({ groupName: 'IntProtSet_GDrive_FormatSpreadsheets_Group', rtl: false}); 
                    


          $("#rbIntProtSet_GDrive_GDocs_dd_docx").jqxRadioButton({ groupName: 'IntProtSet_GDrive_FormatDownldDocs_Group', rtl: false}); 
          $("#rbIntProtSet_GDrive_GDocs_dd_odt").jqxRadioButton({ groupName: 'IntProtSet_GDrive_FormatDownldDocs_Group', rtl: false}); 
          $("#rbIntProtSet_GDrive_GDocs_dd_rtf").jqxRadioButton({ groupName: 'IntProtSet_GDrive_FormatDownldDocs_Group', rtl: false}); 
          $("#rbIntProtSet_GDrive_GDocs_dd_html").jqxRadioButton({ groupName: 'IntProtSet_GDrive_FormatDownldDocs_Group', rtl: false}); 
          $("#rbIntProtSet_GDrive_GDocs_dd_pdf").jqxRadioButton({ groupName: 'IntProtSet_GDrive_FormatDownldDocs_Group', rtl: false}); 
          $("#rbIntProtSet_GDrive_GDocs_dd_txt").jqxRadioButton({ groupName: 'IntProtSet_GDrive_FormatDownldDocs_Group', rtl: false}); 
          

          $("#rbIntProtSet_GDrive_GDocs_dpres_pptx").jqxRadioButton({ groupName: 'IntProtSet_GDrive_FormatDownldPres_Group', rtl: false}); 
          $("#rbIntProtSet_GDrive_GDocs_dpres_pdf").jqxRadioButton({ groupName: 'IntProtSet_GDrive_FormatDownldPres_Group', rtl: false}); 
          $("#rbIntProtSet_GDrive_GDocs_dpres_txt").jqxRadioButton({ groupName: 'IntProtSet_GDrive_FormatDownldPres_Group', rtl: false}); 

           

          $("#cbIntProtSet_GDrive_GDocs_ftconvert_csv").jqxCheckBox({ width: 120, height: 25});  
          $("#cbIntProtSet_GDrive_GDocs_ftconvert_html").jqxCheckBox({ width: 120, height: 25});   
          $("#cbIntProtSet_GDrive_GDocs_ftconvert_pdf").jqxCheckBox({ width: 120, height: 25});   
          $("#cbIntProtSet_GDrive_GDocs_ftconvert_pptx").jqxCheckBox({ width: 120, height: 25});   
          $("#cbIntProtSet_GDrive_GDocs_ftconvert_txt").jqxCheckBox({ width: 120, height: 25});   
          $("#cbIntProtSet_GDrive_GDocs_ftconvert_doc").jqxCheckBox({ width: 120, height: 25});   
          $("#cbIntProtSet_GDrive_GDocs_ftconvert_ods").jqxCheckBox({ width: 120, height: 25});   
          $("#cbIntProtSet_GDrive_GDocs_ftconvert_pps").jqxCheckBox({ width: 120, height: 25});   
          $("#cbIntProtSet_GDrive_GDocs_ftconvert_rtf").jqxCheckBox({ width: 120, height: 25});   
          $("#cbIntProtSet_GDrive_GDocs_ftconvert_xls").jqxCheckBox({ width: 120, height: 25});   
          $("#cbIntProtSet_GDrive_GDocs_ftconvert_docx").jqxCheckBox({ width: 120, height: 25});   
          $("#cbIntProtSet_GDrive_GDocs_ftconvert_odt").jqxCheckBox({ width: 120, height: 25});   
          $("#cbIntProtSet_GDrive_GDocs_ftconvert_ppt").jqxCheckBox({ width: 120, height: 25});   
          $("#cbIntProtSet_GDrive_GDocs_ftconvert_tsv").jqxCheckBox({ width: 120, height: 25});   
          $("#cbIntProtSet_GDrive_GDocs_ftconvert_xlsx").jqxCheckBox({ width: 120, height: 25});   
          

       } 
       else if( ProtocolName == 'Amazon S3' )
       {          
          $("#jqxInternetProtSettingsTabs_div").html( InternetProtSettingsTabsHTML_AmazonS3 );            
          GInternetProtSettingsTabs = $('#jqxInternetProtSettingsTabs').jqxTabs({ width: GInternetProtSettingsTabControlWidth, height: GInternetProtSettingsTabControlHeight });   
       
          $("#inptIntProtSet_AmazonS3_bucket").jqxInput({ width: 350, height: 25 });
          $("#cbIntProtSet_AmazonS3_reduced_redundancy").jqxCheckBox({ width: 120, height: 25});             
          $("#inptInternetFolder").jqxInput({ width: 350, height: 25 });

          $("#inptIntProtSet_AmazonS3_access_id").jqxInput({ width: 350, height: 25 });                  
          $("#inptAccountOpt").jqxPasswordInput({ width: 350, height: 25 });    
          
          $("#cbIntProtSet_AmazonS3_save_access_id").jqxCheckBox({ width: 120, height: 25});   
          $("#cbIntProtSet_AmazonS3_save_secret_key").jqxCheckBox({ width: 120, height: 25});    
          $("#cbIntProtSet_AmazonS3_allow_ipv6").jqxCheckBox({ width: 120, height: 25});                     
          $("#cbIntProtSet_AmazonS3_filename_encoding").jqxCheckBox({ width: 120, height: 25}); 




         var AmazonS3_adv_CharsetComboSource = ['Automatic', 'Unicode(UTF-8)', 'Windows ANSI' ];
          
          $("#comboIntProtSet_AmazonS3_adv_Charset").jqxComboBox({ source: AmazonS3_adv_CharsetComboSource, selectedIndex: 0, width: '250', height: '25px'});
          $("#cbIntProtSet_AmazonS3_adv_replace_characters").jqxCheckBox({ width: 120, height: 25});    
          $("#cbIntProtSet_AmazonS3_make_uploaded_files_pub_available").jqxCheckBox({ width: 120, height: 25});    
          $("#cbIntProtSet_AmazonS3_recursive_listing").jqxCheckBox({ width: 120, height: 25});    
          $("#cbIntProtSet_AmazonS3_use_server_side_encryption").jqxCheckBox({ width: 120, height: 25});    
          $("#cbIntProtSet_AmazonS3_adv_zone").jqxCheckBox({ width: 120, height: 25});    
          $("#cbIntProtSet_AmazonS3_adv_UTC").jqxCheckBox({ width: 120, height: 25});    

            
          $("#inptIntProtSet_AmazonS3_adv_list").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false });
          $("#inptIntProtSet_AmazonS3_adv_upload_min").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false });
                    
          $("#inptIntProtSet_AmazonS3_adv_timeout").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false });          
          $("#inptIntProtSet_AmazonS3_adv_retries").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false });          
          $("#inptIntProtSet_AmazonS3_adv_http_retries").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false });                                                



          var AmazonS3_proxy_proxy_typeComboSource = ['No Proxy(default)', 'USER user@hostname', 'SITE(with logon)', 'OPEN', 'USER/PASS combined', 'Transparent'];
          $("#comboIntProtSet_AmazonS3_proxy_proxy_type").jqxComboBox({ source: AmazonS3_proxy_proxy_typeComboSource, selectedIndex: 0, width: '250', height: '25px'});
          $("#inptIntProtSet_AmazonS3_proxy_proxy_host").jqxInput({ width: 350, height: 25 });
          $("#inptIntProtSet_AmazonS3_proxy_proxy_port").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false }); 

          $("#inptIntProtSet_AmazonS3_proxy_login").jqxInput({ width: 350, height: 25 });          
          $("#inptIntProtSet_AmazonS3_proxy_password").jqxPasswordInput({ width: 350, height: 25 });
          $("#cbIntProtSet_AmazonS3_proxy_send_host_command").jqxCheckBox({ width: 120, height: 25});    
          


          $("#rbIntProtSet_AmazonS3_Security_SSLv2").jqxRadioButton({ groupName: 'IntProtSet_AmazonS3_Version_Group', rtl: false});                     
          $("#rbIntProtSet_AmazonS3_Security_SSLv2_3").jqxRadioButton({ groupName: 'IntProtSet_AmazonS3_Version_Group', rtl: false}); 
          $("#rbIntProtSet_AmazonS3_Security_SSLv3").jqxRadioButton({ groupName: 'IntProtSet_AmazonS3_Version_Group', rtl: false}); 
          $("#rbIntProtSet_AmazonS3_Security_TLSv_1_1_2").jqxRadioButton({ groupName: 'IntProtSet_AmazonS3_Version_Group', rtl: false}); 

          $("#btnIntProtSet_AmazonS3_Security_Advanced_SSH").jqxButton({ template: "info" }); 

          $("#cbIntProtSet_AmazonS3_Security_SSH_username_password").jqxCheckBox({ width: 120, height: 25});
          $("#cbIntProtSet_AmazonS3_Security_SSH_keyboard").jqxCheckBox({ width: 120, height: 25});
          $("#cbIntProtSet_AmazonS3_Security_SSH_certificate").jqxCheckBox({ width: 120, height: 25});


          var AmazonS3_security_CertificateComboSource = ['none'];
          $("#comboIntProtSet_AmazonS3_security_Certificate").jqxComboBox({ source: AmazonS3_security_CertificateComboSource, selectedIndex: 0, width: '250', height: '25px'});
          $("#inptIntProtSet_AmazonS3_security_CertificatePassword").jqxPasswordInput({ width: 350, height: 25 }); 
          $("#cbIntProtSet_AmazonS3_security_nopassword").jqxCheckBox({ width: 120, height: 25});


                    
       }
       else if( ProtocolName == 'Asure' )  
       {


         $("#jqxInternetProtSettingsTabs_div").html( InternetProtSettingsTabsHTML_Asure );  
         GInternetProtSettingsTabs = $('#jqxInternetProtSettingsTabs').jqxTabs({ width: GInternetProtSettingsTabControlWidth, height: GInternetProtSettingsTabControlHeight });   
     
        // Internet Folder
        
          $("#inptIntProtSet_Asure_container").jqxInput({ width: 350, height: 25 });
          $("#inptInternetFolder").jqxInput({ width: 350, height: 25 });
          $("#inptIntProtSet_Asure_account_id").jqxInput({ width: 350, height: 25 });
          $("#inptIntProtSet_Asure_account_id").jqxInput({ width: 350, height: 25 });          
          $("#inptAccountOpt").jqxPasswordInput({ width: 350, height: 25 });
          $("#cbIntProtSet_Asure_save_user_id").jqxCheckBox({ width: 120, height: 25});
          $("#cbIntProtSet_Asure_save_password").jqxCheckBox({ width: 120, height: 25});
          $("#cbIntProtSet_Asure_allow_ipv6").jqxCheckBox({ width: 120, height: 25});
          $("#cbIntProtSet_Asure_filename_encoding").jqxCheckBox({ width: 120, height: 25});
                                                  

          var Asure_adv_CharsetComboSource = ['Automatic', 'Unicode(UTF-8)', 'Windows ANSI' ];
          
          $("#comboIntProtSet_Asure_adv_Charset").jqxComboBox({ source: Asure_adv_CharsetComboSource, selectedIndex: 0, width: '250', height: '25px'});
          $("#cbIntProtSet_Asure_adv_replace_characters").jqxCheckBox({ width: 120, height: 25});
          $("#cbIntProtSet_Asure_adv_recursive_listing").jqxCheckBox({ width: 120, height: 25});
          $("#inptIntProtSet_Asure_adv_cache_control").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false }); 
          $("#cbIntProtSet_Asure_adv_zone").jqxCheckBox({ width: 120, height: 25});
          $("#cbIntProtSet_Asure_adv_UTC").jqxCheckBox({ width: 120, height: 25});
          $("#inptIntProtSet_Asure_adv_list").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false }); 
          $("#inptIntProtSet_Asure_adv_upload_min").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false }); 
          $("#inptIntProtSet_Asure_adv_timeout").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false }); 
          $("#inptIntProtSet_Asure_adv_retries").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false }); 
          $("#inptIntProtSet_Asure_adv_http_retries").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false }); 
                                                            
  
          var Asure_proxy_proxy_typeComboSource = ['No Proxy(default)', 'USER user@hostname', 'SITE(with logon)', 'OPEN', 'USER/PASS combined', 'Transparent'];
          $("#comboIntProtSet_Asure_proxy_proxy_type").jqxComboBox({ source: Asure_proxy_proxy_typeComboSource, selectedIndex: 0, width: '250', height: '25px'});
          $("#inptIntProtSet_Asure_proxy_proxy_host").jqxInput({ width: 350, height: 25 });
          $("#inptIntProtSet_Asure_proxy_proxy_port").jqxFormattedInput({ width: 50, height: 25, radix: "decimal", value: "0", min: "0", max: "10000", spinButtons: false }); 

          $("#inptIntProtSet_Asure_proxy_login").jqxInput({ width: 350, height: 25 });          
          $("#inptIntProtSet_Asure_proxy_password").jqxPasswordInput({ width: 350, height: 25 });
          $("#cbIntProtSet_Asure_proxy_send_host_command").jqxCheckBox({ width: 120, height: 25});    
          


          $("#rbIntProtSet_Asure_Security_SSLv2").jqxRadioButton({ groupName: 'IntProtSet_Asure_Version_Group', rtl: false});                     
          $("#rbIntProtSet_Asure_Security_SSLv2_3").jqxRadioButton({ groupName: 'IntProtSet_Asure_Version_Group', rtl: false}); 
          $("#rbIntProtSet_Asure_Security_SSLv3").jqxRadioButton({ groupName: 'IntProtSet_Asure_Version_Group', rtl: false}); 
          $("#rbIntProtSet_Asure_Security_TLSv_1_1_2").jqxRadioButton({ groupName: 'IntProtSet_Asure_Version_Group', rtl: false}); 

          $("#btnIntProtSet_Asure_Security_Advanced_SSH").jqxButton({ template: "info" }); 

          $("#cbIntProtSet_Asure_Security_SSH_username_password").jqxCheckBox({ width: 120, height: 25});
          $("#cbIntProtSet_Asure_Security_SSH_keyboard").jqxCheckBox({ width: 120, height: 25});
          $("#cbIntProtSet_Asure_Security_SSH_certificate").jqxCheckBox({ width: 120, height: 25});


          var Asure_security_CertificateComboSource = ['none'];
          $("#comboIntProtSet_Asure_security_Certificate").jqxComboBox({ source: Asure_security_CertificateComboSource, selectedIndex: 0, width: '250', height: '25px'});
          $("#inptIntProtSet_Asure_security_CertificatePassword").jqxPasswordInput({ width: 350, height: 25 }); 
          $("#cbIntProtSet_Asure_security_nopassword").jqxCheckBox({ width: 120, height: 25});



                    
                                                                                                                          
       }

        LoadRegistryListToControls( GCurrentInternetProtocolSetRegistryList, ProtocolName );                                                                     

        if( GInternetProtSettingsTabs != null)   
        {

            $("#inptInternetFolder").jqxInput( 'val' , GLeftRightSideInput.jqxInput( 'val' ) );
            if( GLeftOrRight == "Left" )
              $("#inptAccountOpt").jqxInput( 'val' , GLeftAccountOpt );            
            else            
              $("#inptAccountOpt").jqxInput( 'val' , GRightAccountOpt );
            
        }


                           

}


function InitProtocolSettingsForm( ProfileName, InternetProtocolSetRegistryList, LeftOrRight, ProtocolName )
{
    GCurrentInternetProtocolSetRegistryList = InternetProtocolSetRegistryList;
    GSelectedProfileName = ProfileName;  
    GLeftOrRight = LeftOrRight;
    GProtocolName = ProtocolName;

    $("#ProtocolSettingsForm_div").html( ProtocolSettingsFormHTML );   
	   ///Internet Protocol SettingsDlg
    $("#jqxwInternetProtSettingsDlg").jqxWindow({ maxWidth: GInternetProtSettingsDialogWidth, maxHeight: GInternetProtSettingsDialogHeight, height: GInternetProtSettingsDialogHeight,  
        width: GInternetProtSettingsDialogWidth,  theme: 'energyblue',  autoOpen: false,  isModal: true,  animationType: 'slide' });



            $('#Cancel_btn3').jqxButton({});
  
            $('#Cancel_btn3').click(function () {

               $('#jqxwInternetProtSettingsDlg').jqxWindow('close');
            });

            
            $('#OK_btn3').jqxButton({});

            $('#OK_btn3').click(function (){                            

               if( GLeftOrRight == "Left" )
               {
                  //in synapp_profile_editor_form                
                  GLeftProtocolName = $("#jqxProtocolCombo").jqxComboBox('val');
                  if( $("#inptInternetFolder").length > 0 )                                       
                     GLeftRightSideInput.jqxInput('val',  $("#inptInternetFolder").jqxInput( 'val' ) );
                    
                  
               }
               else if( GLeftOrRight == "Right" )
               {
                  //in synapp_profile_editor_form                
                  GRightProtocolName = $("#jqxProtocolCombo").jqxComboBox('val');     
                  if( $("#inptInternetFolder").length > 0 )                  
                    GLeftRightSideInput.jqxInput('val',  $("#inptInternetFolder").jqxInput( 'val' ) );
                  
               }

               ControlValuesToRegistryList(GCurrentInternetProtocolSetRegistryList, $("#jqxProtocolCombo").jqxComboBox('val') );

               
               $('#jqxwInternetProtSettingsDlg').jqxWindow('close');
            });


// Protocols combo

            var ProtocolComboSource = ['FTP', 'SSH', 'WebDAV', 'Amazon S3', 'HTTP', 'Asure', 'RSync', 'Glacier', 'Box', 'Google Drive',
              'DropBox',  'Rackspace', 'OneDrive', 'SygarSync', 'MTP', 'Email' ];
            // Create a jqxComboBox
            $("#jqxProtocolCombo").jqxComboBox({ source: ProtocolComboSource, selectedIndex: 0, width: '250', height: '25px'});

           

            $('#jqxProtocolCombo').on('select', function (event) {
                    var args = event.args;
                    if (args != undefined) 
                    {
                        var item = event.args.item;                        
                        
                        if ( ( item != null )  ) 
                        {                           
                           OnProtocolComboItem( GSelectedProfileName, GCurrentInternetProtocolSetRegistryList, GLeftOrRight, item.label );
                        }
                    }
            });



      
      $('#jqxwInternetProtSettingsDlg').on('close', function (event) { 

          
          $('#jqxwInternetProtSettingsDlg').jqxWindow('destroy'); 

      });
      $("#jqxwInternetProtSettingsDlg").jqxWindow('open') 
      $('#jqxwInternetProtSettingsDlg').on('open', function (event) 
      { 
       
          $("#jqxProtocolCombo").jqxComboBox( 'val', GProtocolName );
          OnProtocolComboItem( GSelectedProfileName, GCurrentInternetProtocolSetRegistryList, GLeftOrRight, GProtocolName );            

       }); 

}