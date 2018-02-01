import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'dTRStatus-dashboard',
    templateUrl: './dTRStatusDashboard.component.html',
    styleUrls: ['./../dashboard.style.css']
})

export class DTRStatusDashboardComponent implements OnInit{

    ngOnInit(): void {

        $('.dtr-status-dashboard table').dataTable({
            filter: false,
            lengthMenu: [ 10, 25, 50, 75, 100, 200 ]
        });
        
       	$(".dtr-status-dashboard .dataTables_length select").select2({
		    width: 80
	    });
        
        $('.dtr-status-dashboard table tbody tr').on("click", function(){
             $('.dtr-status-dashboard-detail').removeClass('hide'); // Show
             $('.dtr-status-dashboard-detail02').addClass('hide'); // Hide
        });

        $('.dtr-status-dashboard table tfoot tr a').on("click", function(){
            $('.dtr-status-dashboard-detail').addClass('hide'); // Show
            $('.dtr-status-dashboard-detail02').removeClass('hide'); // Hide
        });

        $('.dtr-status-dashboard-detail table').dataTable({
            filter: false,
            lengthMenu: [ 10, 25, 50, 75, 100, 200 ]
        });
        
       	$(".dtr-status-dashboard-detail .dataTables_length select").select2({
		    width: 80
	    });

        $('.dtr-status-dashboard-detail02 table').dataTable({
            filter: false,
            lengthMenu: [ 10, 25, 50, 75, 100, 200 ]
        });
        
       	$(".dtr-status-dashboard-detail02 .dataTables_length select").select2({
		    width: 80
	    });
    }
    
    closeDTRStatusDashboardDetail() {
        $(".dtr-status-dashboard-detail").addClass('hide');
        $(".dtr-status-dashboard-detail02").addClass('hide');
    }
}