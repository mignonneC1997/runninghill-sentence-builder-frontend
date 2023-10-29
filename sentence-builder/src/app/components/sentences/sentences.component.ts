import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ReplaySubject, takeUntil } from 'rxjs';

import { LoggingService } from '../../services/logging.service';
import { SentencesService } from '../../services/sentences.service';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-sentences',
  templateUrl: './sentences.component.html',
  styleUrls: ['./sentences.component.css']
})
export class SentencesComponent implements OnInit, OnDestroy {
  private destroy$: ReplaySubject<boolean> = new ReplaySubject(1);
  public loading = false;
  public submittedSentences: any = [];
  public selectedWordType = '';
  public selectedWord  = '';
  public sentence: string = '';
  public wordForm!: FormGroup;
  public wordList: any = [];
  public wordTypes: any = null;

  constructor(private fb: FormBuilder, private sentenceService: SentencesService, public toastr: ToasterService,
    private logService: LoggingService) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.loadWordTypes();
    this.loadSubmittedSentences();
  }

  public buildForm = () => {
    this.wordForm = this.fb.group({
      wordType: ['', Validators.required],
      word: [ '', Validators.required],
    });
  }

  public loadWordTypes = () => { // get word types
    try {
      this.loading = true;
      this.sentenceService.getWordTypes().pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          if (response && response.body && response.body.response && response.body.response.length > 0) {
            this.wordTypes = response.body.response
          } else {
            this.wordTypes = null
          }
        },
        error: (err: ErrorEvent) => {
          this.loading = false;
          this.toastr.showError('Could not load word types ');
          this.logService.frontendLogging(4, `ERROR - loadWordTypes MESSAGE - ${JSON.stringify(err.message)}`);
        },
        complete: () => {
          this.loading = false;
          return;
        }
      });
    } catch (error: any) {
      this.loading = false;
      this.logService.frontendLogging(4, `ERROR - loadWordTypes TRY/CATCH MESSAGE - ${JSON.stringify(error.message)}`);
    }
  }

  public loadSubmittedSentences = () => { // retrieve words already in database
    try {
      this.loading = true;
      this.sentenceService.getSubmittedSentences().pipe(takeUntil(this.destroy$)).subscribe({
        next: (response) => {
          if (response && response.body && response.body.recordset && response.body.recordset.length > 0) {
            this.submittedSentences = response.body.recordset;
          } else {
            this.submittedSentences = [];
          }
        },
        error: (err: ErrorEvent) => {
          this.loading = false;
          this.toastr.showError('Could not load previous sentences');
          this.logService.frontendLogging(4, `ERROR - loadSubmittedSentences MESSAGE - ${JSON.stringify(err.message)}`);
        },
        complete: () => {
          this.loading = false;
          return;
        }
      });
    } catch (error: any) {
      this.loading = false;
      this.logService.frontendLogging(4, `ERROR - loadSubmittedSentences TRY/CATCH MESSAGE - ${JSON.stringify(error.message)}`);

    }
  }

  public selectWordType = () => { // get word based on word type
    try {
      this.loading = true;
      this.selectedWordType = this.wordForm.get('wordType')?.value;
      if (this.selectedWordType) {
        this.sentenceService.getWordsByWordType(this.selectedWordType).pipe(takeUntil(this.destroy$)).subscribe({
          next: (words: any) => {
            if (words && words.body && words.body.recordset && words.body.recordset.length > 0) {
              this.wordList = words.body.recordset
            } else {
              this.wordList = [];
            }
          },
          error: (err: ErrorEvent) => {
            this.loading = false;
            this.toastr.showError('Could not load words');
            this.logService.frontendLogging(4, `ERROR - selectWordType MESSAGE - ${JSON.stringify(err.message)}`);
          },
          complete: () => {
            this.loading = false;
            return;
          }
        });
      }
    } catch (error: any) {
      this.loading = false;
      this.logService.frontendLogging(4, `ERROR - selectWordType TRY/CATCH MESSAGE - ${JSON.stringify(error.message)}`);
    }
  }

  public selectWord = (): void => {
    this.selectedWord = this.wordForm.get('word')?.value;
  }

  public addToSentence = () => {
    const selectedWord = this.wordForm.get('word')?.value;

    if (selectedWord) {
      // Append the selected word to the sentence with a space
      this.sentence += selectedWord + ' ';
      
      // Clear the selected word from the form
      this.wordForm.get('word')?.setValue('');
    }
  }

  public submitSentence = () => { // save new sentence
    try {
      this.loading = true;
      this.sentenceService.submitSentence(this.sentence).pipe(takeUntil(this.destroy$)).subscribe({
        next: (response: any) => {
          this.toastr.showSuccess('Successfully saved new sentence');
          this.sentence = '';   
          this.wordForm.get('word')?.setValue('');
        },
        error: (err: ErrorEvent) => {
          this.loading = false;
          this.toastr.showError('Could not submit new sentences');
          this.logService.frontendLogging(4, `ERROR - submitSentence MESSAGE - ${JSON.stringify(err.message)}`);

        },
        complete: () => {
          this.loading = false;
          this.loadSubmittedSentences();
          return;
        }
      });
    } catch (error: any) {
      this.loading = false;
      this.logService.frontendLogging(4, `ERROR - submitSentence TRY/CATCH MESSAGE - ${JSON.stringify(error.message)}`);
    }
  }

  public clearSentence = () => {
    this.sentence = '';   
    this.wordForm.get('word')?.setValue('');
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}