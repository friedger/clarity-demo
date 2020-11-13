(define-non-fungible-token developer-nft uint)

(define-map registry 
 (
  (id uint)) 
 ( 
  (name (string-ascii 30)) 
  (url (string-ascii 250))))

(define-map lookup
 (
   (name (string-ascii 30)))
 (
  (id uint)))


(define-data-var last-id uint u0)

(define-public (say-hi) (ok "Welcome to Clarity demo"))

(define-read-only (get-last-id) (var-get last-id))

(define-public (register (name (string-ascii 30)) (url (string-ascii 250)))
  (let ((id (+ (get-last-id) u1))) 
    (begin (var-set last-id id)       
      (map-insert registry {id: id} {name: name, url: url}) 
      (map-insert lookup {name: name} {id: id})
      (unwrap! (nft-mint? developer-nft id tx-sender) (err 1))            
      (ok id))))

(define-private (get-id-by-name? (name (string-ascii 30)))
  (get id (map-get? lookup {name: name})))
   
(define-read-only (get-data-by-name? (name (string-ascii 30)))
   (map-get? registry {id: (unwrap! (get-id-by-name? name) none)}))

(define-read-only (get-owner? (name (string-ascii 30)))
 (nft-get-owner? developer-nft (unwrap! (get-id-by-name? name) none)))

(define-public (update (name (string-ascii 30)) (url (string-ascii 30)))
  (if (is-eq tx-sender (unwrap-panic (get-owner? name)))                                                                       
    (ok (map-set registry {id: (unwrap! (get-id-by-name? name) (err u1))} {name: name, url: url}))
    (err u2)))

(define-public (transfer (name (string-ascii 30)) (recipient principal))
 (if (is-eq tx-sender (unwrap-panic (get-owner? name)))
   (nft-transfer? developer-nft (unwrap! (get-id-by-name? name) (err u1)) tx-sender recipient)
    (err u2)))