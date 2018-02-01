import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'serviceSummary-Dashboard',
    templateUrl: './serviceSummaryDashboard.component.html',
    styleUrls: ['./../dashboard.style.css']
})

export class ServiceSummaryDashboardComponent implements OnInit{

    ngOnInit(): void {
        $('.service-summary-dashboard table').dataTable({
            filter: false,
            lengthMenu: [ 10, 25, 50, 75, 100, 200 ]
        });
        
       	$(".service-summary-dashboard .dataTables_length select").select2({
		    width: 80
	    });
        
        $('.service-summary-dashboard table tbody tr').on("click", function(){
             $('.service-summary-dashboard-detail').removeClass('hide'); // Show
             $('.service-summary-dashboard-detail02').addClass('hide'); // Hide
        });

        $('.service-summary-dashboard table tfoot tr a').on("click", function(){
            $('.service-summary-dashboard-detail').addClass('hide'); // Show
            $('.service-summary-dashboard-detail02').removeClass('hide'); // Hide
        });

        $('.service-summary-dashboard-detail table').dataTable({
            filter: false,
            lengthMenu: [ 10, 25, 50, 75, 100, 200 ]
        });
        
       	$(".service-summary-dashboard-detail .dataTables_length select").select2({
		    width: 80
	    });

        $('.service-summary-dashboard-detail02 table').dataTable({
            filter: false,
            lengthMenu: [ 10, 25, 50, 75, 100, 200 ]
        });
        
       	$(".service-summary-dashboard-detail02 .dataTables_length select").select2({
		    width: 80
	    });
    }
    
    closeServiceSummaryDashboardDetail() {
        $(".service-summary-dashboard-detail").addClass('hide');
        $(".service-summary-dashboard-detail02").addClass('hide');
    }
}