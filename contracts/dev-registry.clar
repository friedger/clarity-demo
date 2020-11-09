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
      (ok id))))

(define-private (get-id-by-name (name (string-ascii 30)))
 (unwrap! (get id (map-get? lookup {name: name})) u1))

(define-read-only (get-data-by-name? (name (string-ascii 30)))
   (map-get? registry {id: (get-id-by-name name)}))

(define-public (update (name (string-ascii 30)) (url (string-ascii 30)))
  (ok (map-set registry {id: (get-id-by-name name)} {name: name, url: url})))
