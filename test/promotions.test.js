const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();
const server = 'https://mobile.borodach.pro/api';

function getRandomIntInclusive(max) {
    let rand = Math.random() * (max + 1 - 0);
    return Math.floor(rand);
}

describe('Promotions API', () => {

    let promotionId = null;

    describe('GET /api/promotions', () => {
        it('It should return all promotions', (done) => {
            chai.request(server)
                .get('/promotions')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    if (res.body.length !== 0) {
                        let index = getRandomIntInclusive(res.body.length);
                        promotionId = res.body[index].id;
                    }
                    done();
                });
        })
    })

    describe('GET /api/promotions/correct-id', () => {
        it('It should GET a promotion by id', (done) => {
            chai.request(server)
                .get('/promotions/' + promotionId)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('description');
                    res.body.should.have.property('image');
                    res.body.should.have.property('previewImage');
                    res.body.should.have.property('videoUrl');
                    res.body.should.have.property('startsAt');
                    res.body.should.have.property('expiresAt');
                    res.body.should.have.property('branches');
                    res.body.should.have.property('allBranches');
                    res.body.should.have.property('url');
                    res.body.should.have.property('type');
                    res.body.should.have.property('id').eq(promotionId);
                    done();
                })
        })
    })

    describe('GET /api/promotions/wrong-id', () => {
        it('It should return 404', (done) => {
            let wrongId = `73e39225-7a25-45fc-a0b5-57309c8b87b5`;
            chai.request(server)
                .get('/promotions/' + wrongId)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        })
    })
})



