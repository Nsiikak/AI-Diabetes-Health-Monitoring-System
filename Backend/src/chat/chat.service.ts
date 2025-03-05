/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as admin from 'firebase-admin';
import axios from 'axios';
import * as serviceAccount from '../../config/firebase-admin.json';

@Injectable()
export class ChatService {
  private db: FirebaseFirestore.Firestore;

  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          serviceAccount as admin.ServiceAccount,
        ),
        projectId: serviceAccount.project_id, // Get project ID from the service account.
      });
    }
    this.db = admin.firestore();
  }
  /**
   * Retrieve relevant documents from Firestore.
   * This basic example fetches up to 5 active documents.
   */
  async getRelevantDocs(query: string): Promise<any[]> {
    try {
      const snapshot = await this.db
        .collection('knowledgeBase')
        .where('active', '==', true)
        .limit(5)
        .get();

      const docs = [];
      snapshot.forEach((doc) => {
        docs.push(doc.data());
      });
      return docs;
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw new InternalServerErrorException(
        'Error fetching documents from Firestore',
      );
    }
  }

  /**
   * Build a prompt and generate a response from the Gemini API.
   */
  async generateResponse(query: string): Promise<string> {
    const docs = await this.getRelevantDocs(query);
    const context = docs.map((doc) => doc.text).join('\n');

    const prompt = `You are a diabetes management assistant. Based on the following information:\n${context}\nAnswer the following question:\n${query}`;

    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
          },
        },
      );

      // Access the response data correctly
      const generatedText = response.data.candidates[0].content.parts[0].text;
      return generatedText;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      if (error.response) {
        console.error('Gemini API response', error.response.data);
      }
      throw new InternalServerErrorException(
        'Error generating response from Gemini',
      );
    }
  }
}
