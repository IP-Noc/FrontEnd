import { Component, OnInit } from '@angular/core';
import UserModel from 'src/app/model/UserModel';
import { AdminService } from 'src/app/services/admin/admin.service';

declare var $: any;

const USERS: UserModel[] = [
  // ... Populate this array with instances of UserModel
];

/**
 * @class ListclientComponent
 * @implements {OnInit}
 * The ListclientComponent class handles the display and search functionalities for the list of clients.
 */
@Component({
  selector: 'app-listclient',
  templateUrl: './listclient.component.html',
  styleUrls: ['./listclient.component.css']
})
export class ListclientComponent implements OnInit {
  searchText: any;
  page = 1;
  pageSize = 4;
  collectionSize = USERS.length;
  users!: UserModel[];
  selectedClient: UserModel | null = null; // Ensure correct type
  successMessage: string | null = null; // Variable to manage success message
  id: any;

  constructor(private sA: AdminService) {
    this.refreshUsers();
  }

  refreshUsers(): void {
    this.users = USERS
      .map((user, i) => ({ id: i + 1, ...user }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  getUsers(): void {
    this.sA.ListCompanys().subscribe({
      next: (data: any) => {
        this.users = data;
        console.log(data);
      },
      error: (err) => {
        console.error('Error fetching clients:', err);
      }
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  openModal(client: UserModel): void {
    this.selectedClient = { ...client }; // Copy client data to selectedClient
    this.id = client.CompanyData._id;
    console.log(this.id);
    $('#updateClientModal').modal('show');
  }

  onSubmit(): void {
    if (this.selectedClient) {
      const data = {
        name: this.selectedClient.CompanyData.name,
        email: this.selectedClient.email,
        phone: this.selectedClient.phone,
        location: this.selectedClient.CompanyData.location,
        status: this.selectedClient.status // Include status in the update
      };
      
      // Implement the update logic here, such as calling an API to save the changes
      this.sA.UpdateCompany(this.id, data).subscribe({
        next: (response) => {
          console.log(response);
          this.successMessage = 'Client updated successfully!';
          // Hide the modal
          $('#updateClientModal').modal('hide');
          // Refresh the user list to reflect changes
          this.getUsers();
        },
        error: (err) => {
          console.error('Error updating client:', err);
        }
      });
    }
  }
}
