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
  public subscription!: Subscription;
  public wordTypes: any = null;
  public wordForm!: FormGroup;
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
        this.wordTypes = response.body.response
      },
      error: (err: ErrorEvent) => {
        this.toastr.showError('Could not load word types ');
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
        this.toastr.showError('Could not submit sentences');
      },
      complete: () => {
        return;
      }
    });
  }

  public selectWordType = () => {
    this.selectedWordType = this.wordForm.get('wordType')?.value;
    if (this.selectedWordType) {
      // this.subscription = this.sentenceService.getWordsByWordType(this.selectedWordType).subscribe((words: any) => {
      //   this.wordList = words.body.recordset;
      // });

      this.subscription = this.sentenceService.getWordsByWordType(this.selectedWordType).subscribe({
        next: (words: any) => {
          this.wordList = words.body.recordset;
        },
        error: (err: ErrorEvent) => {
          this.toastr.showError('Could not load word types');
        },
        complete: () => {
          return;
        }
      });
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

  public submitSentence = () => {

    this.subscription = this.sentenceService.submitSentence(this.sentence).subscribe({
      next: (response: any) => {
        this.loadSubmittedSentences();
      },
      error: (err: ErrorEvent) => {
        this.toastr.showError('Could not submit new sentences');
      },
      complete: () => {
        return;
      }
    });
    // this.subscription = this.sentenceService.submitSentence(this.sentence).subscribe(
    //   (response) => {
    //     this.loadSubmittedSentences();
    //   },
    //   (error) => {
    //     this.toastr.showError('Could not load sentences. ');
    //   }
    // );
  }

  public clearSentence = () => {
    this.sentence = '';   
    this.wordForm.get('word')?.setValue('');
  }

  ngOnDestroy() {
    // Unsubscribe from the observable to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}