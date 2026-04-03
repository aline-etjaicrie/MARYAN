# Configuration DNS Resend pour maryanapp.fr

Pour que les emails partent de bonjour@maryanapp.fr (au lieu de aline@etjaicrie.com),
il faut ajouter ces enregistrements DNS sur Gandi.

## Étapes

1. Aller sur resend.com > Domains > Add Domain > entrer "maryanapp.fr"
2. Resend génère des enregistrements DNS à copier
3. Sur Gandi : Domaines > maryanapp.fr > DNS > Ajouter les enregistrements

## Enregistrements à ajouter (générés par Resend)

Type : TXT
Nom : resend._domainkey
Valeur : (fournie par Resend)

Type : TXT
Nom : @
Valeur : v=spf1 include:amazonses.com ~all (ou ce que Resend indique)

Type : MX (si nécessaire)
(Resend indique les valeurs exactes)

## Une fois configuré

Changer dans src/lib/email.ts :
const FROM_EMAIL = 'MARYAN <bonjour@maryanapp.fr>';

## Webhook Stripe

Après avoir créé l'endpoint /api/stripe-webhook, l'enregistrer dans Stripe :
1. Stripe Dashboard > Developers > Webhooks > Add endpoint
2. URL : https://maryanapp.fr/api/stripe-webhook
3. Events à sélectionner :
   - checkout.session.completed
   - customer.subscription.created
   - customer.subscription.updated
   - customer.subscription.deleted
   - invoice.payment_failed
4. Copier le "Signing secret" (whsec_...)
5. L'ajouter dans Vercel : STRIPE_WEBHOOK_SECRET = whsec_...
