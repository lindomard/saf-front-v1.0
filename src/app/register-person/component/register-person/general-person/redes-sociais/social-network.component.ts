import { Component, OnInit, ViewChild, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ItemTable, TableListComponent } from '@base-shared/table-list/table-list.component';
import { UntypedFormGroup } from '@angular/forms';
import { FormBuildConfig } from '@base-shared/form-build/form-build.component';
import { MarkTouchedForm } from '@base-core/mark-touched-form/mark-touched-form';
import { safeCall, safeCallOrNull } from '@base-core/safe-call';
import { ItemOptionList } from '@base-shared/input-field-button/input-field-button.component';
import { nameControlTypeNetwork, SocialNetworkForm } from './social-network-form';
import { SocialNetworkEntity } from '@register/domain/entities/social-netwoek-entity.model';

@Component({
  selector: 'app-social-network',
  templateUrl: './social-network.component.html',
  styleUrls: ['./social-network.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SocialNetworkComponent implements OnInit {

  @ViewChild('instanceTable', { static: false }) instanceTableList: TableListComponent;

  @Output() instanceHandle = new EventEmitter<SocialNetworkComponent>();

  form: UntypedFormGroup;
  fields: FormBuildConfig[] = [];

  socialNetworks: SocialNetworkEntity[] = [];
  displayColumns: string[] = [];
  itemsTable: ItemTable[] = [];

  constructor(
    public socialNetworkForm: SocialNetworkForm,
    private markedTouchedForm: MarkTouchedForm,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.initialiazer();
    this.handleClickAdd();
    this.onListenerSelectItem();
    this.instanceHandle.emit(this);
  }

  cleanSocialNetWork() {
    safeCall(this.instanceTableList, () => {
      this.socialNetworks = [];
      this.socialNetworkForm.socialNetwork = [];
      this.instanceTableList.fillDataNoPage([]);
    })
  }

  private onListenerSelectItem() {
    this.socialNetworkForm.handleSelectItem = (item: ItemOptionList) => {
      this.form.get(nameControlTypeNetwork).setValue(item.value);
    }
  }

  private handleClickAdd() {
    this.socialNetworkForm.handleClickAdd = () => {
      this.markedTouchedForm.markedFormControlTouched(this.form)
      if (!this.form.invalid && this.form.disabled === false) {
        this.addSocialNetwork();
      }
    };
  }

  private addSocialNetwork() {
    const value = this.form.getRawValue();
    this.socialNetworks.push(value);
    this.socialNetworkForm.socialNetwork = this.socialNetworks;
    this.form.reset();
    this.notifyChangeItemTable();
  }

  private initialiazer() {
    this.form = this.socialNetworkForm.form;
    this.fields = this.socialNetworkForm.fields;
    this.displayColumns = this.socialNetworkForm.displayColumns;
    this.itemsTable = this.socialNetworkForm.itemsTable;
  }

  onEditListener(index: number) {
    let socialNwtwork: SocialNetworkEntity = this.socialNetworks[index];
    this.socialNetworks.splice(index, 1);
    this.socialNetworkForm.socialNetwork = this.socialNetworks;
    this.notifyChangeItemTable();
    this.form.setValue(socialNwtwork);
  }

  onDeleteListener(index: number) {
    this.socialNetworks.splice(index, 1);
    this.socialNetworkForm.socialNetwork = this.socialNetworks;
    this.notifyChangeItemTable();
  }

  setSocialNetworks(socialNetwork: SocialNetworkEntity[]) {
    this.socialNetworkForm.socialNetwork = socialNetwork;
    const data = socialNetwork;
    this.socialNetworks = [...data];
    this.notifyChangeItemTable();
  }

  notifyChangeItemTable() {
    safeCall(this.instanceTableList, (it) => {
      it.fillDataNoPage(this.socialNetworks);
      this.getStyleShowTable();
      this.cd.detectChanges();
    });
  }

  getStyleShowTable(): object {
    let result: Object = { 'visibility': 'hidden' };
    safeCall(this.socialNetworkForm.socialNetwork, (it) => {
      const show = (it.length > 0);
      if (show) {
        result = { 'visibility': 'visible' }
      }
    });
    return result;
  }

}
