import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'warrantyClaimStatus-dashboard',
    templateUrl: './warrantyClaimStatusDashboard.component.html',
    styleUrls: ['./../dashboard.style.css']
})

export class WarrantyClaimStatusDashboardComponent implements OnInit{

    ngOnInit(): void {

        $('.wc-status-dashboard table').dataTable({
            filter: false,
            lengthMenu: [ 10, 25, 50, 75, 100, 200 ]
        });
        
       	$(".wc-status-dashboard .dataTables_length select").select2({
		    width: 80
	    });
        
        $('.wc-status-dashboard table tbody tr').on("click", function(){
             $('.wc-status-dashboard-detail').removeClass('hide'); // Show
             $('.wc-status-dashboard-detail02').addClass('hide'); // Hide
        });

        $('.wc-status-dashboard table tfoot tr a').on("click", function(){
            $('.wc-status-dashboard-detail').addClass('hide'); // Show
            $('.wc-status-dashboard-detail02').removeClass('hide'); // Hide
        });

        $('.wc-status-dashboard-detail table').dataTable({
            filter: false,
            lengthMenu: [ 10, 25, 50, 75, 100, 200 ]
        });
        
       	$(".wc-status-dashboard-detail .dataTables_length select").select2({
		    width: 80
	    });

        $('.wc-status-dashboard-detail02 table').dataTable({
            filter: false,
            lengthMenu: [ 10, 25, 50, 75, 100, 200 ]
        });
        
       	$(".wc-status-dashboard-detail02 .dataTables_length select").select2({
		    width: 80
	    });
    }
    
    closeWCStatusDashboardDetail(){
        $(".wc-status-dashboard-detail").addClass('hide');
        $(".wc-status-dashboard-detail02").addClass('hide');
    }
}