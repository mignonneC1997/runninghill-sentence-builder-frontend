import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToasterService } from 'src/app/services/toaster.service';
import { SentencesService } from '../../services/sentences.service';

@Component({
  selector: 'app-sentences',
  templateUrl: './sentences.component.html',
  styleUrls: ['./sentences.component.css']
})
export class SentencesComponent implements OnInit {

  public subscription: Subscription | undefined;
  public wordTypes: any = null;
  public wordForm: FormGroup | undefined;
  public selectedWordType = '';
  public selectedWord  = '';
  public submittedSentences: any = [];
  public wordList: any = [];
  sentence: string = '';

  constructor(private fb: FormBuilder, private sentenceService: SentencesService, public toastr: ToasterService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.loadWordTypes();
  }

  buildForm() {
    this.wordForm = this.fb.group({
      wordType: ['', Validators.required],
      word: [ '', Validators.required],
    });
  }

  public loadWordTypes = () => {
    this.subscription = this.sentenceService.getWordTypes().subscribe(
      (sentences: any) => {
        this.wordTypes = sentences.recordset;
      },
      (error) => {
        this.toastr.showError('Could not load sentences. ');
      }
    );
  }


}
