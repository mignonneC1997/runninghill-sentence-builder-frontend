import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, Subscription, takeUntil } from 'rxjs';
import { ToasterService } from 'src/app/services/toaster.service';
import { SentencesService } from '../../services/sentences.service';

@Component({
  selector: 'app-sentences',
  templateUrl: './sentences.component.html',
  styleUrls: ['./sentences.component.css']
})
export class SentencesComponent implements OnInit {
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);
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
    this.loadSubmittedSentences();
  }

  buildForm() {
    this.wordForm = this.fb.group({
      wordType: ['', Validators.required],
      word: [ '', Validators.required],
    });
  }

  public loadWordTypes = () => {
    this.sentenceService.getWordTypes().subscribe({
      next: (response) => {
        this.wordTypes = response.body.recordset
      },
      error: (err: ErrorEvent) => {
      },
      complete: () => {
        return;
      }
    });
  }

  public loadSubmittedSentences = () => {
    this.sentenceService.getSubmittedSentences().subscribe({
      next: (response) => {
        this.submittedSentences = response.body.recordset
      },
      error: (err: ErrorEvent) => {
      },
      complete: () => {
        return;
      }
    });
  }
}